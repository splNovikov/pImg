/**
 * Created by Novikov on 7/14/2016.
 */

define('popup', ['lodash'], function (_) {

		const template = `
				<div class="images-container">

					<% _.forEach(images, function(image) { %>
					<div class="image-wrapper">
						<img src="<%- image.path %>" alt="<%- image.title %>" title="<%- image.title %>"/>
					</div>
					<% }); %>

				</div>
				<div class="triangle-down-wrapper">
					<div class="triangle-down"></div>
					<div class="triangle-down-border"></div>
				</div>`;

		return {
			getTemplate: getTemplate,
			fillTemplate: fillTemplate
		};

		/**
		 * Returns template
		 * @returns {String}
		 */
		function getTemplate() {
			return template.trim();
		}

		/**
		 * Fill template with images and returns html
		 * @param template
		 * @param images {Array}
		 * @returns {String}
		 */
		function fillTemplate(template, images) {
			return _.template(template)({images: images});
		}
	}
);
