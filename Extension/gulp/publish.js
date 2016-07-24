'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	del = require('del'),
	zip = require('gulp-zip'),
	buildSettings = gulp.buildSettings;

gulp.task('publish_DEV', function () {
	_setPublishSettings(gulp.environments.dev);
	runSequence('cleanPublish', 'build');
});

gulp.task('publish_PROD', function () {
	_setPublishSettings(gulp.environments.prod);
	runSequence('cleanPublish', 'build', 'zipPublish');
});

gulp.task('setDevEnv', function () {
	_setPublishSettings(gulp.environments.dev);
});

gulp.task('cleanPublish', function () {
	return del([
		buildSettings.environment.dest + '/**'
	], {force: true});
});

gulp.task('zipPublish', function () {
	var currentDate = new Date().toJSON().slice(0, 10);
	return gulp.src(buildSettings.environment.dest + '/**/*')
		.pipe(zip(buildSettings.environment.zipName + '_' + currentDate + '.zip'))
		.pipe(gulp.dest('../prods_archives/'));
});

function _setPublishSettings(env) {
	gulp.buildSettings.environment = env;
	gulp.buildSettings.isProduction = env === gulp.environments.prod;
}