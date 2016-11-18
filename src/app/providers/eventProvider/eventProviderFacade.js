/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProviderFacade', [
		'lodash',
		'EventProviderConstants',
		'eventProvider',
		'bindStorage'],
	function (_,
	          EventProviderConstants,
	          eventProvider,
	          bindStorage) {

		let _constants = new EventProviderConstants();

		return {
			bindPrimary: bindPrimary,
			bindPopup: bindPopup,
			unbindAbsent: unbindAbsent
		};

		/**
		 * Add listeners to primary element (arrow)
		 * @param uniqueName {String}
		 * @param primary {Element}
		 * @param popup {Element}
		 * @public
		 */
		function bindPrimary(uniqueName, primary, popup) {
			let _unbindPrimary = eventProvider.bind(_constants.ElementsTypes.primary, {primary, popup});
			bindStorage.addItem(uniqueName, _unbindPrimary);
		}

		/**
		 * Add listeners to popup element
		 * @param uniqueName {String}
		 * @param popup {Element}
		 * @param popupNodes {Object}
		 * @param imEditable {Element}
		 * @public
		 */
		function bindPopup(uniqueName, popup, popupNodes, imEditable) {
			let _unbindPopup = eventProvider.bind(_constants.ElementsTypes.popup, {popup, popupNodes, imEditable});
			bindStorage.addItem(uniqueName, _unbindPopup);
		}

		/**
		 * Unbind absent elements and remove them from bindStorage
		 * @param leftoverInjectedButtons {Array<Element>}
		 * @public
		 */
		function unbindAbsent(leftoverInjectedButtons) {
			// find absent ( _absent --> Object with array of callbacks)
			let _absent = bindStorage.getAbsents(leftoverInjectedButtons);
			// unbind array (_absentArray --> array with arrays of callbacks)
			let _absentArray = _.map(_absent);
			if (_absentArray.length === 0) {
				return;
			}
			eventProvider.unbindArray(_absentArray);

			// Remove absent element from bindStorage
			let _absentKeys = Object.keys(_absent);
			bindStorage.removeItemsByUniqueNames(_absentKeys);
		}

	}
);
