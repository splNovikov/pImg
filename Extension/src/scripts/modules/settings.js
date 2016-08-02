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

				this.extensionName = 'Paste images to chat';
				this.pImgSelectors = {
					primary: 'paste-img',
					arrowBlock: 'p-img-primary',
					oldContent: 'p-img-old-content-wrapper',
					popup: 'p-img-popup'
				};
				this.uniqueAttributeName = 'data-pimg-unique-name';
				this.vkElements = {
					sendButtonsSelectors: ['button._im_send', 'button.addpost_button'],
					imEditableSelectors: [
						'div.im_editable',
						'div.im-chat-input--text',
						'div._im_text',
						'div.reply_field',
						'div.submit_post_field']
				};

				instance = this;
			}
		})();

		return ImgSettings;
	}
);
