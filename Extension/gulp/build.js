(function () {
	'use strict';

	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'run-sequence', 'main-bower-files', 'del']
	});
	var buildSettings = gulp.buildSettings;
	var isProduction = gulp.buildSettings.environment === gulp.environments.prod;

	gulp.task('build', function (done) {
		plugins.runSequence('cleanTmp', ['bower-concat', 'misc', 'sass', 'html'], 'copyJS', 'app-concat', done);
	});

	gulp.task('cleanTmp', function () {
		return plugins.del([buildSettings.paths.tmp + '/**']);
	});

	gulp.task('bower', function () {
		return plugins.bower();
	});

	gulp.task('bower-concat', ['bower'], function () {
		return gulp.src(plugins.mainBowerFiles())
			.pipe(plugins.concat('vendor.js'))
			.pipe(plugins.uglify())
			.pipe(plugins.rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest(buildSettings.paths.tmp + '/scripts/libs'));
	});

	gulp.task('misc', function () {
		return gulp.src([
				buildSettings.paths.src + '/**/*.png',
				'src/manifest.json'])
			.pipe(gulp.dest(buildSettings.paths.tmp + '/'));
	});

	gulp.task('sass', function () {
		return gulp.src(buildSettings.paths.src + '/styles/*.scss')
			.pipe(plugins.sass({outputStyle: 'compressed'}))
			.pipe(plugins.rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest(buildSettings.paths.tmp + '/styles/'));
	});

	gulp.task('html', function () {
		return gulp.src([
				buildSettings.paths.src + '/views/*.html'
			])
			.pipe(plugins.minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe(gulp.dest(buildSettings.paths.tmp + '/views/'));
	});

	gulp.task('copyJS', function () {
		return gulp.src(buildSettings.paths.src + '/scripts/*.js')
			.pipe(plugins.if(isProduction, plugins.uglify()))
			.pipe(gulp.dest(buildSettings.paths.tmp + '/scripts/app'));
	});

	gulp.task('app-concat', function () {
		return gulp.src([buildSettings.paths.src + '/scripts/modules/*.js',
				buildSettings.paths.src + '/scripts/app.js'])
			.pipe(plugins.babel({
				presets: ['es2015']
			}))
			.pipe(plugins.concat('app.js'))
			.pipe(plugins.if(isProduction, plugins.uglify()))
			.pipe(gulp.dest(buildSettings.paths.tmp + '/scripts/app'));
	});

}());
