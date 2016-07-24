/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProvider', [
		'primaryEvents',
		'popupEvents',
		'EventProviderConstants'],
	function (primaryEvents,
	          popupEvents,
	          EventProviderConstants) {

		let bindEventsObject = _createBindEventsObject();

		return {
			bind: bind,
			unbindArray: unbindArray
		};

		/**
		 * Add event listeners to items and return unbind
		 * @param type
		 * @param nodeElements
		 * @returns {*}
		 */
		function bind(type, nodeElements) {
			return bindEventsObject[type].bindElement(nodeElements);
		}

		/**
		 * Unbind absent elements
		 * @param absent
		 * @returns {*}
		 */
		function unbindArray(absent) {
			let slicedAbsent;
			if (absent.length === 0) {
				return;
			}

			let _absentBtn = absent[0];
			if (typeof _absentBtn.unbindPrimary === "function") {
				_absentBtn.unbindPrimary();
			}
			if (typeof _absentBtn.unbindPopup === "function") {
				_absentBtn.unbindPopup();
			}
			console.info('p-img: button has been unbound.');

			slicedAbsent = absent.slice(1);
			return unbindArray(slicedAbsent);
		}

		/**
		 * Returns Object literal with events Listeners unbinds and etc.
		 * @returns {{}}
		 * @private
		 */
		function _createBindEventsObject() {
			let _constants = new EventProviderConstants();
			let bindEventsObject = {};

			// primary (ArrowWrapper)
			bindEventsObject[_constants.ElementsTypes.primary] = {
				bindElement: function (nodeElements) {
					let _onPrimaryClick = function (event) {
						primaryEvents.click(event, nodeElements);
					};
					nodeElements.primary.addEventListener('click', _onPrimaryClick);
					nodeElements.primary.addEventListener('mouseover', primaryEvents.mouseover);

					return function () {
						nodeElements.primary.removeEventListener('click', primaryEvents.click);
						nodeElements.primary.removeEventListener('mouseover', primaryEvents.mouseover);
					}
				}
			};

			// popup
			bindEventsObject[_constants.ElementsTypes.popup] = {
				bindElement: function (nodeElements) {
					let _onPopupClick = function (event) {
						popupEvents.click(event, nodeElements);
					};
					nodeElements.popup.addEventListener('click', _onPopupClick);
					nodeElements.popup.addEventListener('mouseover', popupEvents.mouseover);

					return function () {
						nodeElements.popup.removeEventListener('click', _onPopupClick);
						nodeElements.popup.removeEventListener('mouseover', popupEvents.mouseover);
					}
				}
			};

			return bindEventsObject;
		}
	}
);
