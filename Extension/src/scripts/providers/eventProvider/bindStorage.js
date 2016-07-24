/**
 * Created by Novikov on 7/19/2016.
 */

define('bindStorage', [
		'lodash',
		'ImgSettings'],
	function (_,
	          ImgSettings) {

		let _bindStorage = {};

		return {
			addItem: addItem,
			getAbsents: getAbsents,
			removeItemsByUniqueNames: removeItemsByUniqueNames
		};

		/**
		 * Add new unbinds to _bindStorage
		 * @param uniqueName
		 * @param unbind
		 */
		function addItem(uniqueName, unbind) {
			_bindStorage[uniqueName] = unbind;
		}

		/**
		 * Get absent and return Array of Objects of unbinds
		 * @param leftoverInjectedButtons {Array<HTMLButtonElement>}
		 */
		function getAbsents(leftoverInjectedButtons) {
			let _settings = new ImgSettings();
			let _uniqueItemsNames = _.map(leftoverInjectedButtons, function (button) {
				return button.getAttribute(_settings.uniqueAttributeName);
			});

			let absents = _.pick(_bindStorage, function (value, key) {
				return !_.contains(_uniqueItemsNames, key);
			});

			return absents;
		}

		/**
		 * remove items by unique names from _bindStorage
		 * @param uniqueItemsNames
		 * @returns {*}
		 */
		function removeItemsByUniqueNames(uniqueItemsNames) {
			let slicedArray;
			if (uniqueItemsNames.length === 0) {
				return;
			}
			delete _bindStorage[uniqueItemsNames[0]];
			console.info(`p-img: button ${uniqueItemsNames[0]} has been removed.`);

			slicedArray = uniqueItemsNames.slice(1);
			return removeItemsByUniqueNames(slicedArray);
		}

	}
);
