/**
 * Created by Novikov on 7/14/2016.
 */

define('oldContent', ['ImgSettings'], function (ImgSettings) {

		return {
			create: create
		};

		/**
		 * @param btn {HTMLButtonElement}
		 * @returns {Element}
		 * @private
		 */
		function create(btn) {
			let _settings = new ImgSettings();

			let _oldContentNode = document.createElement('div');
			_oldContentNode.className = _settings.pImgSelectors.oldContent;
			_oldContentNode.innerHTML = btn.innerHTML;
			return _oldContentNode;
		}
	}
);
