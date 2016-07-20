/**
 * Created by Novikov on 7/19/2016.
 */

define('eventProviderFacade', [
		'EventProviderConstants',
		'eventProvider',
		'bindStorage'],
	function (EventProviderConstants,
	          eventProvider,
	          bindStorage) {

		let _constants = new EventProviderConstants();

		return {
			bindPrimary: bindPrimary,
			//unbind: findAbsent,
			//unbindArray: unbindAbsent
		};

		function bindPrimary(el) {
			eventProvider.bind(_constants.ElementsTypes.primary, el);
		}

	}
);