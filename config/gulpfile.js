var gulp = require('gulp');

gulp.environments = {
  dev: {
    zipName: 'p-img-dev'
  },
  production: {
    zipName: 'p-img-prod'
  }
};

gulp.buildSettings = {
  paths: {
    destination: './../dist',
    src: './../src',
    archives: './../archives'
  },
  environment: {}
};

require('require-dir')('./');
