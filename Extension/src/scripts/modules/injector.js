/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'lodash',
		'buttonInjection',
		'oldContentWrapper',
		'popupInjection',
		'imagesProvider'],

	function (_,
	          buttonInjection,
	          oldContentWrapper,
	          popupInjection,
	          imagesProvider) {

		return {
			startHtmlInjection: startHtmlInjection,
			filterNotInjectedButtons: filterNotInjectedButtons,
			findSendButtons: findSendButtons
		};

		/**
		 * Main injection function. It Injects to all buttons new html
		 * @param notInjectedButtons {Array}
		 * @param pImgSelectors {Object}
		 * @public
		 * @returns {*}
		 */
		function startHtmlInjection(notInjectedButtons, pImgSelectors) {
			_injectToButton(notInjectedButtons[0], pImgSelectors);

			let slicedArray = notInjectedButtons.slice(1);
			if (slicedArray.length !== 0) {
				return startHtmlInjection(slicedArray, pImgSelectors);
			}
		}

		/**
		 * Filters from send buttons - returns only not "injected buttons"
		 * @param sendBtnArr {Array}
		 * @param injectedStyleName {string}
		 * @returns {Array}
		 * @private
		 */
		function filterNotInjectedButtons(sendBtnArr, injectedStyleName) {
			return _.filter(sendBtnArr, function (sendBtn) {
				return !sendBtn.classList.contains(injectedStyleName);
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
		 * @param btn - current button for injection
		 * @param pImgSelectors {Object}
		 * @private
		 */
		function _injectToButton(btn, pImgSelectors) {
			btn.className += ` ${pImgSelectors.primary}`;

			btn.innerHTML = _generateNewInnerHtml(btn, pImgSelectors.arrowBlock);

			buttonInjection.addListener(btn, pImgSelectors);
		}

		/**
		 * Generates new inner html for send button
		 * @param arrowBlockSelector
		 * @returns {string}
		 * @private
		 */
		function _generateNewInnerHtml(btn, arrowBlockSelector) {
			let popupInjectionHtml = popupInjection.fillTemplate(popupInjection.getTemplate(), imagesProvider.getImages());
			let oldContentHtml = oldContentWrapper.wrap(btn.innerHTML);
			let injectionToButtonHtml = buttonInjection.fillTemplate(buttonInjection.getTemplate(), arrowBlockSelector);

			return [popupInjectionHtml, oldContentHtml, injectionToButtonHtml].join('');
		}
	}
);
