var gulp = require('gulp'),
    config = require('../config'),
    notify = require('gulp-notify');


gulp.task('assets', function(){
        return gulp.src(config.paths.assets.images)
        .pipe(gulp.dest(config.paths.assets.dest))
        .pipe(notify({ message: 'Images copied' }));
    });

    