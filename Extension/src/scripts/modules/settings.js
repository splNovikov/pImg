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

				this.pImgSelectors = {
					primary: 'paste-img',
					arrowBlock: 'p-img-arrow',
					popup: 'p-img-popup'
				};
				this.vkElements = {
					sendButtonsSelectors: ['button._im_send', 'button.addpost_button']
				};

				instance = this;
			}
		})();

		return ImgSettings;
	}
);
