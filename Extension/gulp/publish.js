'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    zip = require('gulp-zip'),
    buildSettings = gulp.buildSettings;

gulp.task('publish_DEV', function () {
    _setPublishSettings(gulp.environments.dev);
    runSequence('build', 'cleanPublish', 'copyPublish', 'cleanTmp');
});

gulp.task('publish_PROD', function () {
    _setPublishSettings(gulp.environments.prod);
    runSequence('build', 'cleanPublish', 'copyPublish', 'cleanTmp', 'zipPublish');
});

gulp.task('cleanPublish', function () {
    return del([
        buildSettings.environment.dest + '/**'
    ], {force: true});
});

gulp.task('copyPublish', function () {
    return gulp.src(buildSettings.paths.tmp + '/**/*')
        .pipe(gulp.dest(buildSettings.environment.dest + '/'));
});

gulp.task('zipPublish', function () {
    var currentDate = new Date().toJSON().slice(0, 10);
    return gulp.src(buildSettings.environment.dest + '/**/*')
        .pipe(zip(buildSettings.environment.zipName + '_' + currentDate + '.zip'))
        .pipe(gulp.dest('../prods_archives/'));
});

function _setPublishSettings(env) {
    gulp.buildSettings.environment = env;
}