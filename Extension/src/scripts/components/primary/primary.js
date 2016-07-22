/**
 * Created by Novikov on 7/11/2016.
 */

define('primary', function () {

		const template = '<span class="arrow-down">&#x25BC</span></div>';

		return {
			getTemplate: getTemplate
		};

		/**
		 * Returns template
		 * @public
		 * @returns {String}
		 */
		function getTemplate() {
			return template.trim();
		}

	}
);
