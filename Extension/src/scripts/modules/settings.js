/**
 * Created by Novikov on 7/7/2016.
 */

define('ImgSettings', [], function () {
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
					oldContent: 'old-content-wrapper',
					popup: 'p-img-popup'
				};
				this.uniqueAttributeName = 'data-pimg-unique-name';
				this.vkElements = {
					sendButtonsSelectors: ['button._im_send', 'button.addpost_button']
				};

				instance = this;
			}
		})();

		return ImgSettings;
	}
);
