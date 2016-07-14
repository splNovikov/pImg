(function () {
	'use strict';

	var gulp = require('gulp');

	gulp.environments = {
		dev: {
			dest: '../PublishDEV',
			zipName: 'p-img-dev'
		},
		prod: {
			dest: '../PublishPROD',
			zipName: 'p-img-prod'
		}
	};

	gulp.buildSettings = {
		paths: {
			src: 'src'
		},
		environment: {}
	};

	require('require-dir')('./gulp');

	gulp.task('__publish_PROD', ['publish_PROD']);
	gulp.task('__publish_DEV', ['publish_DEV']);

}());
