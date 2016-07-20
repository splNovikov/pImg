/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'lodash',
		'ImgSettings',
		'buttonInjection',
		'popupInjection',
		'imagesProvider',
		'eventProviderFacade'],

	function (_,
	          ImgSettings,
	          buttonInjection,
	          popupInjection,
	          imagesProvider,
	          eventProviderFacade) {

		return {
			makeHtmlInjectionAndBindings: makeHtmlInjectionAndBindings,
			filterNotInjectedButtons: filterNotInjectedButtons,
			findSendButtons: findSendButtons
		};

		/**
		 * Main injection function. It Injects to all buttons new html
		 * @param notInjectedButtons {Array}
		 * @public
		 * @returns {*}
		 */
		function makeHtmlInjectionAndBindings(notInjectedButtons) {
			let elements = _injectToButton(notInjectedButtons[0]);
			eventProviderFacade.bindPrimary(elements);

			let slicedArray = notInjectedButtons.slice(1);
			if (slicedArray.length !== 0) {
				return makeHtmlInjectionAndBindings(slicedArray);
			}
		}

		/**
		 * Filters from send buttons - returns only not "injected buttons"
		 * @param sendBtnArr {Array}
		 * @param uniqueAttributeName {String}
		 * @returns {Array}
		 * @private
		 */
		function filterNotInjectedButtons(sendBtnArr, uniqueAttributeName) {
			return _.filter(sendBtnArr, function (sendBtn) {
				return !sendBtn.hasAttribute(uniqueAttributeName);
			});
		}

		/**
		 * Find all buttons with selectors from buttonsSelectors
		 * @param buttonsSelectors {Array}
		 * @returns {Array.<T>}
		 * @private
		 */
		function findSendButtons(buttonsSelectors) {
			return Array.prototype.slice.call(document.querySelectorAll(buttonsSelectors));
		}

		/**
		 * Injecting html to button
		 * @param btn {HTMLButtonElement} - current button for injection
		 * @private
		 */
		function _injectToButton(btn) {
			let _settings = new ImgSettings();

			let uniqueName = _createUniqueId();
			btn.setAttribute(_settings.uniqueAttributeName, uniqueName);

			let popupInjectionNode = _createPopupNode(_settings.pImgSelectors.popup);
			let oldContentNode = _createOldContentNode(btn, _settings.pImgSelectors.oldContent);
			let injectionToButtonNode = _createInjectionToButtonNode(_settings.pImgSelectors.arrowBlock);

			_createNewContent(btn, _settings.pImgSelectors.primary, popupInjectionNode, oldContentNode, injectionToButtonNode);

			return {
				uniqueName,
				primary: injectionToButtonNode,
				popup: popupInjectionNode
			};
		}

		/**
		 *
		 * @param popupSelector
		 * @returns {Element}
		 * @private
		 */
		function _createPopupNode(popupSelector) {
			let _settings = new ImgSettings();
			let popupInjectionNode = document.createElement('div');
			popupInjectionNode.className = popupSelector;
			let popupInjectionHtml = popupInjection.fillTemplate(popupInjection.getTemplate(), imagesProvider.getImages());
			popupInjectionNode.innerHTML = popupInjectionHtml;
			return popupInjectionNode;
		}

		/**
		 * @param btn {HTMLButtonElement}
		 * @returns {Element}
		 * @private
		 */
		function _createOldContentNode(btn, oldContentSelector) {
			let oldContentNode = document.createElement('div');
			oldContentNode.className = oldContentSelector;
			oldContentNode.innerHTML = btn.innerHTML;
			return oldContentNode;
		}

		/**
		 *
		 * @param arrowBlockSelector {String}
		 * @returns {Element}
		 * @private
		 */
		function _createInjectionToButtonNode(arrowBlockSelector) {
			let injectionToButtonNode = document.createElement('div');
			injectionToButtonNode.className = arrowBlockSelector;
			let injectionToButtonHtml = buttonInjection.getTemplate();
			injectionToButtonNode.innerHTML = injectionToButtonHtml;
			return injectionToButtonNode;
		}

		/**
		 *
		 * @param btn {HTMLButtonElement}
		 * @param primarySelector {String}
		 * @param popupInjectionNode {Element}
		 * @param oldContentNode {Element}
		 * @param injectionToButtonNode {Element}
		 * @returns {HTMLButtonElement}
		 * @private
		 */
		function _createNewContent(btn, primarySelector, popupInjectionNode, oldContentNode, injectionToButtonNode) {
			let frag = document.createDocumentFragment();
			frag.appendChild(popupInjectionNode);
			frag.appendChild(oldContentNode);
			frag.appendChild(injectionToButtonNode);

			btn.className += ` ${primarySelector}`;
			btn.innerHTML = '';
			btn.appendChild(frag);

			return btn;
		}

		/**
		 *
		 * @returns {string}
		 * @private
		 */
		function _createUniqueId() {
			return '_' + Math.random().toString(36).substr(2, 9);
		}
	}
);
