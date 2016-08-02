/**
 * Created by Novikov on 7/23/2016.
 */

define('htmlFinder', function () {

		return {
			findSendButtons: findSendButtons,
			getImEditableForEl: getImEditableForEl
		};

		/**
		 * Find all buttons with selectors from buttonsSelectors
		 * @param buttonsSelectors {Array}
		 * @returns {NodeList}
		 * @private
		 */
		function findSendButtons(buttonsSelectors) {
			return document.querySelectorAll(buttonsSelectors);
		}

		/**
		 * Returns imEditable textarea for button
		 * @param el {Node}
		 * @param selectorsList {Array<String>}
		 * @param maxParent {Number}
		 * @param currentParent {?Number}
		 */
		function getImEditableForEl(el, selectorsList, maxParent, currentParent) {
			var currentParent = currentParent || 0;
			let _el = el.parentNode;
			let _imEditable = _el.querySelector(selectorsList);

			if (_imEditable) {
				return _imEditable;
			} else {
				currentParent += 1;
				if (currentParent === maxParent) {
					window.console.error('p-img: editable aria not found');
					return null;
				} else {
					return getImEditableForEl(_el, selectorsList, maxParent, currentParent);
				}
			}
		}
	}
);
