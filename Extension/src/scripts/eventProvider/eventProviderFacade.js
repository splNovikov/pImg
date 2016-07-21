/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProviderFacade', [
		'ImgSettings',
		'EventProviderConstants',
		'eventProvider',
		'bindStorage'],
	function (ImgSettings,
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
		 * @param el -> {uniqueName, primary, popup}
		 */
		function bind(el) {
			let unbindPrimary = eventProvider.bind(_constants.ElementsTypes.primary, el);
			let unbindPopup = eventProvider.bind(_constants.ElementsTypes.popup, el.popup);
			bindStorage.addItem(el.uniqueName, {unbindPrimary, unbindPopup});
		}

		/**
		 * Unbind absent elements and remove them from bindStorage
		 * @param leftoverInjectedButtons {Array<HTMLButtonElement>}
		 */
		function unbindAbsent(leftoverInjectedButtons) {
			let _settings = new ImgSettings();
			let _uniqueItemsNames = _.map(leftoverInjectedButtons, function (button) {
				return button.getAttribute(_settings.uniqueAttributeName);
			});

			// find absent
			let _absent = bindStorage.getAbsentsByUniqueNames(_uniqueItemsNames);
			// unbind array
			eventProvider.unbindArray(_absent);
			// Remove absent element from bindStorage
			bindStorage.removeItemsByUniqueNames(_uniqueItemsNames);
		}

	}
);