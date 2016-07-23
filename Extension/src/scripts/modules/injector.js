/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'lodash',
		'finder',
		'ImgSettings',
		'primary',
		'popup',
		'imagesProvider',
		'eventProviderFacade'],

	function (_,
	          finder,
	          ImgSettings,
	          primary,
	          popup,
	          imagesProvider,
	          eventProviderFacade) {

		return {
			makeHtmlInjectionAndBindings: makeHtmlInjectionAndBindings,
			filterInjectedButtons: filterInjectedButtons
		};

		/**
		 * Main injection function. It Injects to all buttons new html
		 * @param notInjectedButtons {Array}
		 * @public
		 * @returns {*}
		 */
		function makeHtmlInjectionAndBindings(notInjectedButtons) {
			let _settings = new ImgSettings();
			let _btn = notInjectedButtons[0];
			let _newNodeElements = _crateNewNodeElements(_btn, _settings);

			// html injection:
			_injectNodeElementsToButton(_btn, _newNodeElements, _settings.pImgSelectors.primary);
			// and bindings:
			eventProviderFacade.bind(_newNodeElements);

			let slicedArray = notInjectedButtons.slice(1);
			if (slicedArray.length !== 0) {
				return makeHtmlInjectionAndBindings(slicedArray);
			}
		}

		/**
		 * Filters from send buttons -
		 * returns only not "injected buttons" or only "injected"
		 * @param sendBtnArr {NodeList}
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
		 * Creates new nodes for button
		 * @param btn {HTMLButtonElement} - current button for injection
		 * @param imgSettings {Object}
		 * @private
		 */
		function _crateNewNodeElements(btn, imgSettings) {
			let uniqueName = _createUniqueId();
			btn.setAttribute(imgSettings.uniqueAttributeName, uniqueName);

			let popupNode = _createPopupNode(imgSettings.pImgSelectors.popup);
			let oldContentNode = _createOldContentNode(btn, imgSettings.pImgSelectors.oldContent);
			let primaryNode = _createInjectionToButtonNode(imgSettings.pImgSelectors.arrowBlock);
			let imEditable = finder.getImEditableForEl(btn, imgSettings.vkElements.imEditableSelectors, 3);

			return {
				uniqueName,
				primary: primaryNode,
				oldContent: oldContentNode,
				popup: popupNode,
				imEditable: imEditable
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
			popupNode.innerHTML = popup.fillTemplate(popup.getTemplate(), imagesProvider.getImages());
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
			primaryNode.innerHTML = primary.getTemplate();
			return primaryNode;
		}

		/**
		 * @param btn {HTMLButtonElement}
		 * @param primarySelector {String}
		 * @param nodes {Object}
		 * @returns {HTMLButtonElement}
		 * @private
		 */
		function _injectNodeElementsToButton(btn, nodes, primarySelector) {
			let frag = document.createDocumentFragment();
			frag.appendChild(nodes.popup);
			frag.appendChild(nodes.oldContent);
			frag.appendChild(nodes.primary);

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
