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
		 * @param el
		 * @returns {*}
		 */
		function bind(type, el) {
			return bindEventsObject[type].bindElement(el);
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

			if (typeof absent[0].unbindPrimary === "function") {
				absent[0].unbindPrimary();
			}
			if (typeof absent[0].unbindPopup === "function") {
				absent[0].unbindPopup();
			}

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
				bindElement: function (el) {
					let _onPrimaryClick = function (event) {
						primaryEvents.click(event, el.popup);
					};
					el.primary.addEventListener('click', _onPrimaryClick);
					el.primary.addEventListener('mouseover', primaryEvents.mouseover);

					return function () {
						el.primary.removeEventListener('click', primaryEvents.click);
						el.primary.removeEventListener('mouseover', primaryEvents.mouseover);
					}
				}
			};

			// popup
			bindEventsObject[_constants.ElementsTypes.popup] = {
				bindElement: function (popup) {
					popup.addEventListener('click', popupEvents.click);
					popup.addEventListener('mouseover', popupEvents.mouseover);

					return function () {
						popup.removeEventListener('click', popupEvents.click);
						popup.removeEventListener('mouseover', popupEvents.mouseover);
					}
				}
			};

			return bindEventsObject;
		}
	}
);
