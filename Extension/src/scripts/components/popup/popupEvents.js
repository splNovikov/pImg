/**
 * Created by Novikov on 7/14/2016.
 */

define('popupEvents', function () {
	return {
		click: click,
		mouseover: mouseover
	};

	/**
	 * On popup click event
	 * @param event
	 */
	function click(event) {
		event.stopPropagation();

		let src = event.target.src;
		debugger;
	}

	/**
	 * On popup mouseover event
	 * @param event
	 */
	function mouseover(event){
		event.stopPropagation();
	}
});
