var gulp = require('gulp'),
    config = require('../config'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('scripts', function() {
  	return gulp.src(config.paths.js.app)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(config.names.js.app))
    .pipe(gulp.dest(config.paths.js.dest))
	.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.js.dest))
    .pipe(notify({ message: 'Scripts task complete' }));
	});