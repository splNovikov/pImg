/**
 * Created by Novikov on 7/14/2016.
 */

define('popupInjection', ['lodash'], function (_) {

		const templateHtml = `
			<div class="p-img-popup" id="p-img-popup">
				<div class="images-container" id="images-container">

				<% _.forEach(images, function(image) { %>
				<div class="image-wrapper">
					<img src="<%- image.path %>" alt="<%- image.title %>" title="<%- image.title %>"/>
				</div>
				<% }); %>

			</div>
			<div class="triangle-down-wrapper">
				<div class="triangle-down"></div>
				<div class="triangle-down-border"></div>
			</div>
		</div>`;

		return {
			getTemplate: getTemplate,
			fillTemplate: fillTemplate

		};

		function getTemplate() {
			return templateHtml.trim();
		}

		function fillTemplate(template, images) {
			return _.template(template)({images: images});
		}
	}
);
