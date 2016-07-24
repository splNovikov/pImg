require([
		'ImgSettings',
		'finder',
		'injector',
		'eventProviderFacade'],
	function (ImgSettings,
	          finder,
	          injector,
	          eventProviderFacade) {

		let _settings = new ImgSettings();
		let _smallPollingMs = 300;
		let _longPollingMs = 1500;

		polling(_settings, _smallPollingMs);

		function polling(ms) {
			polling.currentMs = ms;
			polling.interval = setInterval(function () {
				// find all send buttons
				let sendBtnArr = finder.findSendButtons(_settings.vkElements.sendButtonsSelectors);

				// if there are no any button -> restart polling
				if (sendBtnArr.length === 0) {
					_restartPolling(polling, _smallPollingMs);
					return;
				}

				// 1. Find injected buttons
				let injectedButtons = injector.filterInjectedButtons(sendBtnArr, _settings.uniqueAttributeName, true);
				// 2. Makes unbind of absent buttons and removes from bindStorage
				eventProviderFacade.unbindAbsent(injectedButtons);

				// 3. Find not injected
				let notInjectedButtons = injector.filterInjectedButtons(sendBtnArr, _settings.uniqueAttributeName, false);

				// if found - setPolling to Long and make injection to the new buttons
				if (notInjectedButtons.length !== 0) {
					_restartPolling(polling, _longPollingMs);
					injector.makeHtmlInjectionAndBindings(notInjectedButtons);
				}
			}, ms);
		}

		/**
		 * restarts polling with new ms. If ms is not new - nothing happens.
		 * @param polling {function}
		 * @param newPollingMs {int}
		 * @private
		 */
		function _restartPolling(polling, newPollingMs) {
			if (polling.currentMs === newPollingMs) {
				return;
			}
			clearInterval(polling.interval);
			polling(newPollingMs);
		}
	});
