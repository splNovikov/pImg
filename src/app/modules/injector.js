/**
 * Created by Novikov on 7/11/2016.
 */

define('injector', [
		'lodash',
		'combineFabric',
		'ImgSettings'],

	function (_,
	          combineFabric,
	          ImgSettings) {

		return {
			makeHtmlInjection: makeHtmlInjection,
			filterInjectedButtons: filterInjectedButtons
		};

		/**
		 * Main injection function. It Injects to all buttons new html
		 * @param notInjectedButtons {Array}
		 * @public
		 * @returns {*}
		 */
		function makeHtmlInjection(notInjectedButtons) {
			let _settings = new ImgSettings();
			let _btn = notInjectedButtons[0];
			let _uniqueName = _createUniqueId();
			_btn.setAttribute(_settings.uniqueAttributeName, _uniqueName);
			combineFabric.injectHtml(_btn, _uniqueName);

			let _slicedArray = notInjectedButtons.slice(1);
			if (_slicedArray.length !== 0) {
				return makeHtmlInjection(_slicedArray);
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
		 * @returns {string}
		 * @private
		 */
		function _createUniqueId() {
			return '_' + Math.random().toString(36).substr(2, 9);
		}
	}
);
