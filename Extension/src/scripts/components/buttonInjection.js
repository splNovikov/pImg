/**
 * Created by Novikov on 7/11/2016.
 */

define('buttonInjection', ['lodash'], function (_) {

		const template = `
			<div class="<%- arrowSelector %>">
				<span class="arrow-down">&#x25BC</span>
			</div>`;

		return {
			getTemplate: getTemplate,
			fillTemplate: fillTemplate,
			addListener: addListener
		};

		/**
		 * Returns template
		 * @public
		 * @returns {String}
		 */
		function getTemplate() {
			return template.trim();
		}

		/**
		 * Fills temlate with selector and returns html
		 * @param template
		 * @param selector
		 * @public
		 * @returns {*}
		 */
		function fillTemplate(template, selector) {
			return _.template(template)({arrowSelector: selector});
		}

		/**
		 * Add listeners to arrow block in button
		 * @param btn
		 * @param pImgSelectors {Object}
		 * @public
		 */
		function addListener(btn, pImgSelectors) {
			let btnArrowBlock = btn.getElementsByClassName(pImgSelectors.arrowBlock);
			let popup = btn.getElementsByClassName(pImgSelectors.popup);

			_addListenerToArrowBlock(btnArrowBlock[0], popup[0]);
		}

		/**
		 * Add listeners to element
		 * @param el
		 * @param popup
		 * @private
		 */
		function _addListenerToArrowBlock(el, popup) {
			// todo unbind
			el.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();

				_togglePopup(popup);
			}, true);
			el.addEventListener('mouseover', function (event) {
				event.preventDefault();
				event.stopPropagation();
			});
		}

		/**
		 * Toggle the apperience of popup
		 * @param popup
		 * @private
		 */
		function _togglePopup(popup) {
			if (popup.style.display === "block") {
				popup.style.display = 'none';
			} else {
				popup.style.display = 'block';
			}
		}
	}
);
