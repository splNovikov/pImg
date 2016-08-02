/**
 * Created by Novikov on 7/23/2016.
 */

define('combineFabric', [
		'popup',
		'oldContent',
		'primary',
		'htmlFinder',
		'ImgSettings'
	],
	function (popup,
	          oldContent,
	          primary,
	          htmlFinder,
	          ImgSettings) {

		return {
			injectHtml: injectHtml
		};

		function injectHtml(btn, uniqueName) {
			let _elements = _createNodeElements(btn, uniqueName);
			_injectHtml(btn, _elements);
		}

		/**
		 * @param btn
		 * @param uniqueName
		 * @returns {{popup: {Object}, oldContent: Element, primary: Element, imEditable: *}}
		 * @private
		 */
		function _createNodeElements(btn, uniqueName) {
			let _settings = new ImgSettings();
			let _imEditable = htmlFinder.getImEditableForEl(btn, _settings.vkElements.imEditableSelectors, 3);
			let _popup = popup.create(uniqueName, _imEditable);

			return {
				popup: _popup,
				oldContent: oldContent.create(btn),
				primary: primary.create(uniqueName, _popup),
				imEditable: _imEditable
			};
		}

		/**
		 * @param btn {HTMLButtonElement}
		 * @param nodes {Object}
		 * @returns
		 * @private
		 */
		function _injectHtml(btn, nodes) {
			let _settings = new ImgSettings();
			let frag = document.createDocumentFragment();

			frag.appendChild(nodes.popup);
			frag.appendChild(nodes.oldContent);
			frag.appendChild(nodes.primary);

			btn.className += ` ${_settings.pImgSelectors.primary}`;
			btn.innerHTML = '';
			btn.appendChild(frag);
		}
	}
);
