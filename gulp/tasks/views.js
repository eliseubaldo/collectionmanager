var gulp = require('gulp'),
    config = require('../config'),
    notify = require('gulp-notify'),
    stream = require('merge-stream');



gulp.task('views', function(){
	
	var appShell = gulp.src(config.paths.views.index)
        .pipe(gulp.dest('dist'))

    var allViews = gulp.src(config.paths.views.all)
        .pipe(gulp.dest(config.paths.views.dest))
        .pipe(notify({ message: 'views task complete' }));

     return appShell, allViews       
    });

    