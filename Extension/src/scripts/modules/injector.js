/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'injectionToButtonTemplate',
		'oldContentWrapper',
		'popupInjection'],

	function (injectionToButtonTemplate,
	          oldContentWrapper,
	          popupInjection) {

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

		/**
		 * Injecting html to button
		 * @param btn - current button for injection
		 * @param insertStyleName - styleName to mark that button has been injected
		 * @private
		 */
		function _injectToButton(btn, insertStyleName) {
			btn.className += ` ${insertStyleName}`;

			let popupInjectionHtml = popupInjection.fillTemplate(popupInjection.getTemplate(), _getImagesFromStorage());
			let oldContentHtml = oldContentWrapper.wrap(btn.innerHTML);

			btn.innerHTML = [popupInjectionHtml, oldContentHtml, injectionToButtonTemplate].join('');
		}

		/**
		 * STUB
		 * @returns {*[]}
		 * @private
		 */
		function _getImagesFromStorage() {
			return [
				{title: 'Ах ты ублюдок', path: 'https://pp.vk.me/c624623/v624623651/47cc3/gWV6uQ3oXLo.jpg'},
				{title: 'Вы зануда Серёжа', path: 'https://pp.vk.me/c630622/v630622505/1be2/7yMqLNuFXOA.jpg'},
				{title: 'Ща лопну от смеха', path: 'http://cs7010.vk.me/v7010894/306a/CgYg2CXAsGo.jpg'},
				{title: 'Пощади человек-анекдот', path: 'https://pp.vk.me/c627627/v627627777/20e44/BDApIgvDAxw.jpg'},
				{title: '50 cent Баян', path: 'https://pp.vk.me/c623221/v623221829/45e98/FcVCS9YrnIc.jpg'},
				{title: 'pImg logo', path: 'https://cs7060.vk.me/c629330/v629330002/19c38/JzFtB1_6a-k.jpg'},
				{title: 'Facepalm by me', path: 'https://pp.vk.me/c628618/v628618777/1aafb/Suaxg8qcQJE.jpg'},
				{title: 'Shit', path: 'https://pp.vk.me/c628618/v628618777/1aaf1/83ZOXNh3PBY.jpg'},
				{title: 'Katty with big teeth', path: 'https://pp.vk.me/c628618/v628618777/1ab05/ASC4JDjExlQ.jpg'},
				{title: 'Kate crazy', path: 'https://pp.vk.me/c628618/v628618777/1ab21/zMagSMQIBws.jpg'},
				{title: 'ILU by me', path: 'https://pp.vk.me/c624519/v624519777/571bc/G7twCjZ51zU.jpg'},
				{title: 'ILU Katty', path: 'https://pp.vk.me/c622126/v622126729/538fb/LYkJUM4u82s.jpg'},
				{title: 'ILU M', path: 'https://pp.vk.me/c627826/v627826531/2190b/WSWCdfblV2M.jpg'},
				{title: 'Хуёси', path: 'https://pp.vk.me/c623619/v623619729/49b12/YX4_OAoJZog.jpg'},
				{title: 'Стиффлер показывает факи', path: 'https://pp.vk.me/c627725/v627725520/1b1a6/Bq7EwdtRg6w.jpg'},
				{title: 'Английский fuck you', path: 'https://pp.vk.me/c622830/v622830410/53d7e/95yWb1xf1h4.jpg'},
				{title: 'Fuck you for iphoners', path: 'https://pp.vk.me/c624216/v624216904/50168/FO8AUMfqOII.jpg'},
				{title: 'Fuck you img', path: 'https://pp.vk.me/c624221/v624221815/5cddd/lkLpEg3SB8k.jpg'},
				{title: 'Fuck you M', path: 'https://pp.vk.me/c627826/v627826531/21901/ykLAJbtFhaM.jpg'},
				{title: 'Fuck you Katty', path: 'https://pp.vk.me/c622025/v622025729/49b81/XZOKuSAHdwE.jpg'},
				{title: 'Kiss the fuck by Katty', path: 'https://pp.vk.me/c628618/v628618777/1aae9/Ui-tkqzw2EA.jpg'},
				{title: 'Fuck you Katty2', path: 'https://cs7060.vk.me/c628028/v628028729/2d78d/nSFLbHAb_uw.jpg'},
				{title: 'Double fuck from Katty', path: 'https://pp.vk.me/c622025/v622025729/49b8a/12EUMb59shY.jpg'},
				{title: 'tattoo', path: 'https://pp.vk.me/c7007/v7007300/e576/eR5KLkho1rs.jpg'},
				{title: 'дайте кирпич', path: 'https://pp.vk.me/c627218/v627218777/1d9f3/CdaG8iADZrQ.jpg'}
			];
		}

	}
);
