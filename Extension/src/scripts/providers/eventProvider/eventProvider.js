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
		 * @param type {EventProviderConstants.ElementsTypes}
		 * @param nodeElements {Object}
		 * @returns {*}
		 * @public
		 */
		function bind(type, nodeElements) {
			return bindEventsObject[type].bindElement(nodeElements);
		}

		/**
		 * Unbind absent elements
		 * absentArray --> array with arrays of callbacks
		 * @param absentArray
		 * @returns {*}
		 * @public
		 */
		function unbindArray(absentArray) {
			if (absentArray.length === 0) {
				return;
			}

			let _unbindCallbacks = absentArray[0];
			_executeUnbind(_unbindCallbacks);
			console.info('p-img: button has been unbound.');

			let _slicedAbsent = absentArray.slice(1);
			return unbindArray(_slicedAbsent);
		}

		/**
		 * Execute unbinding
		 * @param cbArray {Array<Function>}
		 * @returns {*}
		 * @private
		 */
		function _executeUnbind(cbArray) {
			let _unbindCallback = cbArray[0];
			if (typeof _unbindCallback === "function") {
				_unbindCallback();
			}
			let _slicedArr = cbArray.slice(1);
			if (_slicedArr.length > 0) {
				return _executeUnbind(_slicedArr);
			}
		}

		/**
		 * Returns Object literal with events Listeners unbinds and etc.
		 * @returns
		 * @private
		 */
		function _createBindEventsObject() {
			let _constants = new EventProviderConstants();
			let bindEventsObject = {};

			// primary (ArrowWrapper)
			bindEventsObject[_constants.ElementsTypes.primary] = {
				bindElement: function (nodeElements) {
					let _onPrimaryClick = function (event) {
						primaryEvents.click(event, nodeElements.popup);
					};
					nodeElements.primary.addEventListener('click', _onPrimaryClick);
					nodeElements.primary.addEventListener('mouseover', primaryEvents.mouseover);

					return function () {
						nodeElements.primary.removeEventListener('click', _onPrimaryClick);
						nodeElements.primary.removeEventListener('mouseover', primaryEvents.mouseover);
					}
				}
			};

			// popup
			bindEventsObject[_constants.ElementsTypes.popup] = {
				bindElement: function (nodeElements) {
					// nodeElements --> { popup, popupNodes, imEditable }
					let _onImagesContainerClick = function (event) {
						popupEvents.imagesContainerClick(event, nodeElements.popup, nodeElements.imEditable);
					};
					let _onHeaderClick = function (event) {
						popupEvents.onHeaderClick(event, nodeElements.popup);
					};
					nodeElements.popupNodes.imagesContainer.addEventListener('click', _onImagesContainerClick);
					nodeElements.popupNodes.header.addEventListener('click', _onHeaderClick);
					nodeElements.popup.addEventListener('click', popupEvents.onPopupClick);
					nodeElements.popup.addEventListener('mouseover', popupEvents.mouseover);

					return function () {
						nodeElements.popupNodes.imagesContainer.removeEventListener('click', _onImagesContainerClick);
						nodeElements.popupNodes.header.removeEventListener('click', _onHeaderClick);
						nodeElements.popup.removeEventListener('click', popupEvents.onPopupClick);
						nodeElements.popup.removeEventListener('mouseover', popupEvents.mouseover);
					}
				}
			};

			return bindEventsObject;
		}

	}
);
