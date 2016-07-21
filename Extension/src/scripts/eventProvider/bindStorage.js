/**
 * Created by Novikov on 7/19/2016.
 */

define('bindStorage', ['lodash'], function (_) {
		let _bindStorage = {};

		return {
			addItem: addItem,
			getAbsentsByUniqueNames: getAbsentsByUniqueNames,
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
		function getAbsentsByUniqueNames(uniqueItemsNames) {
			let absents = _.pick(_bindStorage, function (value, key) {
				return !_.contains(uniqueItemsNames, key);
			});

			return _.map(absents);
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
			slicedArray = uniqueItemsNames.slice(1);
			return removeItemsByUniqueNames(slicedArray);
		}

	}
);
