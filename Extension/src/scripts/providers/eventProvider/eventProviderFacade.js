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
			bind: bind,
			unbindAbsent: unbindAbsent
		};

		/**
		 * Add bindings to element add put unBindings to bindStorage
		 * @param nodeElements -> {uniqueName, primary, popup}
		 */
		function bind(nodeElements) {
			let unbindPrimary = eventProvider.bind(_constants.ElementsTypes.primary, nodeElements);
			let unbindPopup = eventProvider.bind(_constants.ElementsTypes.popup, nodeElements);
			bindStorage.addItem(nodeElements.uniqueName, {unbindPrimary, unbindPopup});
		}

		/**
		 * Unbind absent elements and remove them from bindStorage
		 * @param leftoverInjectedButtons {Array<HTMLButtonElement>}
		 */
		function unbindAbsent(leftoverInjectedButtons) {
			// find absent
			let _absent = bindStorage.getAbsents(leftoverInjectedButtons);
			// unbind array
			let _absentArray = _.map(_absent);
			eventProvider.unbindArray(_absentArray);

			// Remove absent element from bindStorage
			let _absentKeys = Object.keys(_absent);
			bindStorage.removeItemsByUniqueNames(_absentKeys);
		}

	}
);