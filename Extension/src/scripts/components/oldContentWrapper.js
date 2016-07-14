/**
 * Created by Novikov on 7/14/2016.
 */

define('oldContentWrapper', function () {

		return {
			wrap: wrap
		};

		/**
		 * Wrapping existing content
		 * @param content
		 * @returns {*}
		 */
		function wrap(content) {
			return `<div class="old-content-wrapper"> ${content} </div>`;
		}
	}
);
