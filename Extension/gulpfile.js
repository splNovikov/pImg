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
            tmp: '.tmp',
            src: 'src'
        },
        environment: {}
    };

    require('require-dir')('./gulp');

    gulp.task('___publish_PROD', ['publish_PROD']);
    gulp.task('___publish_DEV', ['publish_DEV']);

}());
