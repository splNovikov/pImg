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
		// presumably clicked on something else
		if (!src) {
			return null;
		}

		nodeElements.imEditable.focus();
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
	 * @param popup {Node}
	 * @private
	 */
	function togglePopup(popup) {
		popup.style.display = popup.style.display === "block"
				? "none"
				: "block";
	}
});
