var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var zip = require('gulp-zip');

var buildSettings = gulp.buildSettings;

gulp.task('Publish_DEV', function () {
  setPublishSettings(gulp.environments.dev);
  runSequence('build', 'zipPublish', 'clean');
});

gulp.task('Publish_PROD', function () {
  setPublishSettings(gulp.environments.production);
  runSequence('build', 'zipPublish', 'clean');
});

gulp.task('zipPublish', function () {
  var currentDate = new Date().toJSON().slice(0, 10);
  return gulp.src(buildSettings.paths.destination + '/**/*')
    .pipe(zip(buildSettings.environment.zipName + '_' + currentDate + '.zip'))
    .pipe(gulp.dest(buildSettings.paths.archives));
});

/**
 * @private
 * @param env
 */
function setPublishSettings(env) {
  buildSettings.environment = env;
  gulp.buildSettings.isProduction = env === gulp.environments.production;
}
