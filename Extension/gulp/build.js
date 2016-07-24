(function () {
	'use strict';

	var gulp = require('gulp');
	var plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'run-sequence', 'main-bower-files', 'del']
	});
	var del = require('del');
	var buildSettings = gulp.buildSettings;

	gulp.task('build', function (done) {
		plugins.runSequence(['misc', 'sass', 'html'], 'bowerConcat', 'copyBackgroundJS', 'copyAppJS', done);
	});

	gulp.task('_watchAppJS', ['setDevEnv'], function (done) {
		gulp.watch(buildSettings.paths.src + '/scripts/**/*.js', ['copyAppJS'], done);
	});

	gulp.task('misc', function () {
		return gulp.src([
				buildSettings.paths.src + '/**/*.png',
				'src/manifest.json'])
			.pipe(gulp.dest(buildSettings.environment.dest + '/'));
	});

	gulp.task('sass', function () {
		return gulp.src(buildSettings.paths.src + '/styles/*.scss')
			.pipe(plugins.sass({outputStyle: 'compressed'}))
			.pipe(plugins.rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest(buildSettings.environment.dest + '/styles/'));
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
			.pipe(gulp.dest(buildSettings.environment.dest + '/views/'));
	});

	gulp.task('bower', function () {
		return plugins.bower();
	});

	gulp.task('bowerConcat', ['bower'], function () {
		return gulp.src(plugins.mainBowerFiles())
			.pipe(plugins.concat('vendor.js'))
			.pipe(plugins.uglify())
			.pipe(plugins.rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest(buildSettings.environment.dest + '/scripts/libs'));
	});

	gulp.task('copyBackgroundJS', function () {
		return gulp.src(buildSettings.paths.src + '/scripts/background.js')
			.pipe(plugins.babel({
				presets: ['es2015']
			}))
			.pipe(plugins.if(buildSettings.isProduction, plugins.uglify()))
			.pipe(gulp.dest(buildSettings.environment.dest + '/scripts/app'));
	});

	gulp.task('copyAppJS', function () {
		return gulp.src([
				buildSettings.paths.src + '/scripts/providers/**/*.js',
				buildSettings.paths.src + '/scripts/modules/*.js',
				buildSettings.paths.src + '/scripts/components/**/*.js',
				buildSettings.paths.src + '/scripts/app.js'])
			.pipe(plugins.if(buildSettings.isProduction,
				plugins.babel({
					presets: ['es2015']
				})))
			.pipe(plugins.concat('app.js'))
			.pipe(plugins.if(buildSettings.isProduction, plugins.uglify()))
			.pipe(gulp.dest(buildSettings.environment.dest + '/scripts/app'));
	});

}());
