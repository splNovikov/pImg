/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProvider', [
		'EventProviderConstants',
		'bindStorage'],
	function (EventProviderConstants,
	          bindStorage) {

		let _constants = new EventProviderConstants();
		let bindEventsObject = _createBindEventsObject();

		return {
			bind: bind,
			//unbind: unbind,
			//unbindArray: unbindArray
		};

		function bind(type, el) {
			bindEventsObject[type].bindElement(el);

			let unbindEl = function () {
			};
			bindStorage.addItem(el.uniqueName, unbindEl);
		}

		function _createBindEventsObject() {
			let bindEventsObject = {};

			// primary (ArrowWrapper)
			bindEventsObject[_constants.ElementsTypes.primary] = {
				bindElement: function (el) {
					el.primary.addEventListener('click', function (event) {
						event.preventDefault();
						event.stopPropagation();

						_togglePopup(el.popup);
					}, true);
					el.primary.addEventListener('mouseover', function (event) {
						event.preventDefault();
						event.stopPropagation();
					});
				}
			};
			return bindEventsObject;
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
