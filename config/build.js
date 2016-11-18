var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence', 'main-bower-files', 'del']
});
var buildSettings = gulp.buildSettings;

gulp.task('build:dev', function (done) {
  plugins.runSequence('clean', 'build', done);
});

gulp.task('build:dev:watch', function () {
  plugins.runSequence('build:dev', 'watch');
});

gulp.task('build', function (done) {
  plugins.runSequence(['misc', 'sass', 'html'], 'bowerConcat', 'copyBackgroundJS', 'copyAppJS', done);
});

gulp.task('watch', function (done) {
  gulp.watch(buildSettings.paths.src + '/app/**/*.js', ['copyAppJS'], done);
  gulp.watch([
      buildSettings.paths.src + '/assets/styles/**/*.scss',
      buildSettings.paths.src + '/app/components/**/*.scss'],
    ['sass'], done);
});

//when is production set buildSettings.isProduction --> true


gulp.task('clean', function () {
  return plugins.del([
    buildSettings.paths.destination + '/**'
  ], {force: true});
});

gulp.task('misc', ['misc:manifest'], function () {
  return gulp.src([buildSettings.paths.src + '/assets/**/*.png'])
    .pipe(gulp.dest(buildSettings.paths.destination + '/assets/'));
});

gulp.task('misc:manifest', function () {
  return gulp.src(buildSettings.paths.src + '/assets/manifest.json')
    .pipe(gulp.dest(buildSettings.paths.destination));
});

gulp.task('sass', function () {
  return gulp.src([
    buildSettings.paths.src + '/assets/styles/main.scss',
    buildSettings.paths.src + '/app/components/**/*.scss'])
    .pipe(plugins.autoprefixer())
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(buildSettings.paths.destination + '/styles/'));
});

gulp.task('html', function () {
  return gulp.src([
    buildSettings.paths.src + '/assets/views/*.html'
  ])
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(buildSettings.paths.destination + '/views/'));
});

gulp.task('bower', function () {
  return plugins.bower({
    cwd: '../'
  });
});

gulp.task('bowerConcat', ['bower'], function () {
  return gulp.src(plugins.mainBowerFiles({
    paths: {
      bowerDirectory: '../bower_components',
      bowerJson: '../bower.json'
    }
  }))
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(buildSettings.paths.destination + '/scripts/libs'));
});

gulp.task('copyBackgroundJS', function () {
  return gulp.src(buildSettings.paths.src + '/assets/background.js')
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.if(buildSettings.isProduction, plugins.uglify()))
    .pipe(gulp.dest(buildSettings.paths.destination + '/assets'));
});

gulp.task('copyAppJS', function () {
  return gulp.src([
    buildSettings.paths.src + '/app/settings.js',
    buildSettings.paths.src + '/app/providers/**/*.js',
    buildSettings.paths.src + '/app/modules/*.js',
    buildSettings.paths.src + '/app/components/**/*.js',
    buildSettings.paths.src + '/app/app.js'])
    .pipe(plugins.if(buildSettings.isProduction,
      plugins.babel({
        presets: ['es2015']
      })))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.if(buildSettings.isProduction, plugins.uglify()))
    .pipe(gulp.dest(buildSettings.paths.destination + '/scripts/app'));
});

