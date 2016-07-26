/**
 * Created by Novikov on 7/14/2016.
 */

define('primaryEvents', ['popupEvents'], function (popupEvents) {
	return {
		click: click,
		mouseover: mouseover
	};

	/**
	 * On primary element (arrow) click event
	 * @param event {Event}
	 * @param nodeElements {Object}
	 */
	function click(event, nodeElements) {
		event.stopPropagation();
		popupEvents.togglePopup(nodeElements.popup);
	}

	/**
	 * On primary element (arrow) mouseover event
	 * @param event {Event}
	 */
	function mouseover(event) {
		event.stopPropagation();
	}
});
