/**
 * Created by Novikov on 7/19/2016.
 */

define('EventProviderConstants', function () {
		let EventProviderConstants;

		(function () {
			let instance;

			EventProviderConstants = function () {
				if (instance) {
					return instance;
				}

				this.ElementsTypes = {
					primary: 'primary',
					popup: 'popup'
				};

				instance = this;
			}
		})();

		return EventProviderConstants;
	}
);