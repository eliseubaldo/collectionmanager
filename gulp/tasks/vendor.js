var gulp = require('gulp'),
    config = require('../config'),    
    filter = require('gulp-filter')
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    lib = require('bower-files')();

gulp.task('vendor', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat(config.names.js.vendor))
    .pipe(gulp.dest(config.paths.js.dest));
});



// gulp.task('vendor', function() {
//     return gulp.src(mainBowerFiles(), {base: config.paths.js.vendor})
//     .pipe(filter('**/*.js'))
//     .pipe(concat(config.names.js.vendor))
//     //.pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest(config.paths.js.dest))
//     .pipe(notify({ message: 'Vendor task complete' }));
//     });






// gulp.task('vendor', function() {

//     return gulp.src(mainBowerFiles(), {base:config.paths.js.vendor})
//     .pipe(filter('*.js'))
//     .pipe(concat(config.names.js.vendor))
//     //.pipe(plugins.uglify())
//     .pipe(gulp.dest(config.paths.js.dest))
//     .pipe(notify({ message: 'Vendor task complete' }))
// });
