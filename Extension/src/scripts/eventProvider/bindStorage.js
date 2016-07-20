/**
 * Created by Novikov on 7/19/2016.
 */

define('bindStorage', function () {
		let bindStorage = {};

		return {
			//getAbsent: getAbsent,
			addItem: addItem,
			//removeItem: removeItem
		};

		function addItem(uniqueName, unbind) {
			bindStorage[uniqueName] = unbind;
		}

	}
);
