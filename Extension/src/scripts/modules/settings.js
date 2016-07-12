/**
 * Created by Novikov on 7/7/2016.
 */

define('ImgSettings', [], function () {
		'use strict';

		function ImgSettings() {
			let instance = this;

			this.injectedStyleName = 'paste-img';
			this.vkElements = {
				sendButtonsSelectors: ['button._im_send', 'button.addpost_button']
			};

			ImgSettings = function () {
				return instance;
			};
		}

		return ImgSettings;
	}
);
