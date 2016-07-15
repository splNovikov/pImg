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
		 * @param notInjectedButtons
		 * @param injectedStyleName
		 * @public
		 * @returns {*}
		 */
		function startHtmlInjection(notInjectedButtons, injectedStyleName, arrowBlockSelector) {
			_injectToButton(notInjectedButtons[0], injectedStyleName, arrowBlockSelector);

			let slicedArray = notInjectedButtons.slice(1);
			if (slicedArray.length !== 0) {
				return startHtmlInjection(slicedArray, injectedStyleName, arrowBlockSelector);
			}
		}

		/**
		 * Filters from send buttons - returns only not "injected buttons"
		 * @param sendBtns {array}
		 * @param injectedStyleName {string}
		 * @param notInjectedBtns {array}
		 * @returns {Array}
		 * @private
		 */
		function filterNotInjectedButtons(sendBtns, injectedStyleName) {
			return _.filter(sendBtns, function (sendBtn) {
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
		 * @param insertStyleName - styleName to mark that button has been injected
		 * @private
		 */
		function _injectToButton(btn, btnInjectStyleName, arrowBlockSelector) {
			btn.className += ` ${btnInjectStyleName}`;

			btn.innerHTML = _generateNewInnerHtml(btn, arrowBlockSelector);

			buttonInjection.addListener(btn, arrowBlockSelector);
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
)
;
