/**
 * Created by Novikov on 7/14/2016.
 */

define('popupEvents', function () {
	return {
		imagesContainerClick: imagesContainerClick,
		onHeaderClick: onHeaderClick,
		onPopupClick: onPopupClick,
		mouseover: mouseover,
		togglePopup: togglePopup
	};

	/**
	 * On images container click event
	 * @param event {Event}
	 * @param popup {Element}
	 * @param imEditable {Element}
	 * @returns {null}
	 * @public
	 */
	function imagesContainerClick(event, popup, imEditable) {
		event.stopPropagation();

		let src = event.target.src;

		if (!src) {
			return null;
		}

		// To prevent existing image in clipboard - clear it.
		// If we will not do this - this picture will be inserted too.
		_copyTextToClipboard(' ');

		imEditable.focus();

		// emulation VK behavior
		document.execCommand('insertText', false, src + ' ');
		document.execCommand('paste');
		togglePopup(popup);
	}

	/**
	 * On popup header click event
	 * @param event {Event}
	 * @param popup {Element}
	 */
	function onHeaderClick(event, popup){
		event.stopPropagation();

		if (event.target.classList.contains('close-icon')){
			togglePopup(popup);
		}
	}

	/**
	 * On popup click event
	 * @param event {Event}
	 */
	function onPopupClick(event){
		event.stopPropagation();
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

	/**
	 * Mechanism which puts text to clipboard
	 * http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
	 * @param text {String}
	 * @private
	 */
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
