/**
 * Created by Novikov on 7/14/2016.
 */

define('popupEvents', function () {
	return {
		click: click,
		mouseover: mouseover,
		togglePopup: togglePopup
	};

	/**
	 * On popup click event
	 * @param event {Event}
	 * @param nodeElements {Object}
	 */
	function click(event, nodeElements) {
		event.stopPropagation();

		let src = event.target.src;

		if (!src) {
			return null;
		}

		// To prevent existing image in clipboard - clear it.
		// If we will not do this - this picture will be inserted too.
		_copyTextToClipboard(' ');

		nodeElements.imEditable.focus();

		// emulation VK behavior
		document.execCommand('insertText', false, src + ' ');
		document.execCommand('paste');
		togglePopup(nodeElements.popup);
	}

	/**
	 * On popup mouseover event
	 * @param event {Event}
	 */
	function mouseover(event) {
		event.stopPropagation();
	}

	/**
	 * Toggle the appearance of popup
	 * @param popup
	 * @private
	 */
	function togglePopup(popup) {
		popup.style.display = popup.style.display === "block"
			? "none"
			: "block";
	}

	function _copyTextToClipboard(text) {
		let _textArea = document.createElement("textarea");
		_textArea.value = text;

		document.body.appendChild(_textArea);

		_textArea.select();

		try {
			document.execCommand('copy');
		} catch (err) {
			console.log('p-img: Oops, unable to copy src to clipboard');
		}

		document.body.removeChild(_textArea);
	}

});
