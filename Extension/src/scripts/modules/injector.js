/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'lodash',
		'ImgSettings',
		'primary',
		'popup',
		'imagesProvider',
		'eventProviderFacade'],

	function (_,
	          ImgSettings,
	          primary,
	          popup,
	          imagesProvider,
	          eventProviderFacade) {

		return {
			makeHtmlInjectionAndBindings: makeHtmlInjectionAndBindings,
			filterInjectedButtons: filterInjectedButtons,
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
			eventProviderFacade.bind(elements);

			let slicedArray = notInjectedButtons.slice(1);
			if (slicedArray.length !== 0) {
				return makeHtmlInjectionAndBindings(slicedArray);
			}
		}

		/**
		 * Filters from send buttons -
		 * returns only not "injected buttons" or only "injected"
		 * @param sendBtnArr {Array}
		 * @param uniqueAttributeName {String}
		 * @param isInjected {Boolean} - true -> return injected; false -> return not injected
		 * @returns {Array}
		 * @private
		 */
		function filterInjectedButtons(sendBtnArr, uniqueAttributeName, isInjected) {
			return _.filter(sendBtnArr, function (sendBtn) {
				return sendBtn.hasAttribute(uniqueAttributeName) === isInjected;
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

			let popupNode = _createPopupNode(_settings.pImgSelectors.popup);
			let oldContentNode = _createOldContentNode(btn, _settings.pImgSelectors.oldContent);
			let primaryNode = _createInjectionToButtonNode(_settings.pImgSelectors.arrowBlock);

			_createNewContent(btn, _settings.pImgSelectors.primary, popupNode, oldContentNode, primaryNode);

			return {
				uniqueName,
				primary: primaryNode,
				popup: popupNode
			};
		}

		/**
		 * @param popupSelector
		 * @returns {Element}
		 * @private
		 */
		function _createPopupNode(popupSelector) {
			let popupNode = document.createElement('div');
			popupNode.className = popupSelector;
			let popupHtml = popup.fillTemplate(popup.getTemplate(), imagesProvider.getImages());
			popupNode.innerHTML = popupHtml;
			return popupNode;
		}

		/**
		 * @param btn {HTMLButtonElement}
		 * @param oldContentSelector {String}
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
		 * @param arrowBlockSelector {String}
		 * @returns {Element}
		 * @private
		 */
		function _createInjectionToButtonNode(arrowBlockSelector) {
			let primaryNode = document.createElement('div');
			primaryNode.className = arrowBlockSelector;
			let primaryHtml = primary.getTemplate();
			primaryNode.innerHTML = primaryHtml;
			return primaryNode;
		}

		/**
		 * @param btn {HTMLButtonElement}
		 * @param primarySelector {String}
		 * @param popupNode {Element}
		 * @param oldContentNode {Element}
		 * @param injectionToButtonNode {Element}
		 * @returns {HTMLButtonElement}
		 * @private
		 */
		function _createNewContent(btn, primarySelector, popupNode, oldContentNode, injectionToButtonNode) {
			let frag = document.createDocumentFragment();
			frag.appendChild(popupNode);
			frag.appendChild(oldContentNode);
			frag.appendChild(injectionToButtonNode);

			btn.className += ` ${primarySelector}`;
			btn.innerHTML = '';
			btn.appendChild(frag);

			return btn;
		}

		/**
		 * @returns {string}
		 * @private
		 */
		function _createUniqueId() {
			return '_' + Math.random().toString(36).substr(2, 9);
		}
	}
);
