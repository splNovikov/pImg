/**
 * Created by Novikov on 7/7/2016.
 */

define('ImgSettings', [], function () {
		'use strict';

		let ImgSettings;

		(function () {
			let instance;

			ImgSettings = function () {
				if (instance) {
					return instance;
				}

				this.injectedStyleName = 'paste-img';
				this.arrowBlockSelector = 'pimg-arrow-block';
				this.vkElements = {
					sendButtonsSelectors: ['button._im_send', 'button.addpost_button']
				};

				instance = this;
			}
		})();

		return ImgSettings;
	}
);
