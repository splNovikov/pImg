/**
 * Created by Novikov on 7/14/2016.
 */

define('primaryEvents', function () {
	return {
		click: click,
		mouseover: mouseover
	};

	/**
	 * On primary element (arrow) click event
	 * @param event
	 * @param popup
	 */
	function click(event, popup) {
		event.stopPropagation();
		_togglePopup(popup);
	}

	/**
	 * On primary element (arrow) mouseover event
	 * @param event
	 */
	function mouseover(event) {
		event.stopPropagation();
	}

	/**
	 * Toggle the appearance of popup
	 * @param popup
	 * @private
	 */
	function _togglePopup(popup) {
		popup.style.display = popup.style.display === "block"
			? "none"
			: "block";
	}
});
