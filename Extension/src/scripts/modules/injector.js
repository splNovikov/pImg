/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', ['injectedInButtonPart'], function (injectedInButtonPart) {

		return {
			startHtmlInjection: startHtmlInjection,
			filterNotInjectedButtons: filterNotInjectedButtons,
			findSendButtons: findSendButtons
		};

		function startHtmlInjection(notInjectedButtons, injectedStyleName) {
			let slicedArray;

			_injectToButton(notInjectedButtons[0], injectedStyleName);

			slicedArray = notInjectedButtons.slice(1);

			if (slicedArray.length !== 0) {
				return startHtmlInjection(slicedArray, injectedStyleName)
			}
		}

		/**
		 * Filters from send buttons - returns only not "injected buttons"
		 * @param sendBtns {array}
		 * @param injectedStyleName {string}
		 * @param notInjectedBtns {array}
		 * @returns {array}
		 * @private
		 */
		function filterNotInjectedButtons(sendBtns, injectedStyleName, notInjectedBtns) {
			let slicedArray;
			notInjectedBtns = notInjectedBtns || [];

			if (!sendBtns[0].classList.contains(injectedStyleName)) {
				notInjectedBtns.push(sendBtns[0]);
			}

			slicedArray = sendBtns.slice(1);
			if (slicedArray.length !== 0) {
				return filterNotInjectedButtons(slicedArray, injectedStyleName, notInjectedBtns);
			} else {
				return notInjectedBtns;
			}
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

		function _injectToButton(btn, insertStyleName) {
			btn.className += ` ${insertStyleName}`;

			//$imBtn.append(pImgExt.hTMLs.arrowWrapper);
		}
	}
);
