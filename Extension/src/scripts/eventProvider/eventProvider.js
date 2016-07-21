/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProvider', [
		'EventProviderConstants'],
	function (EventProviderConstants) {

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
		 * Returns Object literal with events Listeners anbinds and etc.
		 * @returns {{}}
		 * @private
		 */
		function _createBindEventsObject() {
			let _constants = new EventProviderConstants();
			let bindEventsObject = {};

			// primary (ArrowWrapper)
			bindEventsObject[_constants.ElementsTypes.primary] = {
				bindElement: function (el) {
					let onClickFunction = function(event){
						_stopBubbling(event);
						_togglePopup(el.popup);
					};

					el.primary.addEventListener('click', onClickFunction);
					el.primary.addEventListener('mouseover', _stopBubbling);

					return function (){
						el.primary.removeEventListener('click', onClickFunction);
						el.primary.removeEventListener('mouseover', _stopBubbling);
					}
				}
			};

			// popup
			bindEventsObject[_constants.ElementsTypes.popup] = {
				bindElement: function (popup) {
					popup.addEventListener('click', _stopBubbling);
					popup.addEventListener('mouseover', _stopBubbling);

					return function (){
						popup.removeEventListener('click', _stopBubbling);
						popup.removeEventListener('mouseover', _stopBubbling);
					}
				}
			};
			return bindEventsObject;
		}

		/**
		 * Toggle the appearance of popup
		 * @param popup
		 * @private
		 */
		function _togglePopup(popup) {
			popup.style.display = popup.style.display === "block"
					? "none"
					: "block";
		}

		/**
		 * Prevent all propagation and default actions
		 * @param event
		 * @private
		 */
		function _stopBubbling(event){
			event.preventDefault();
			event.stopPropagation();
		}
	}
);
