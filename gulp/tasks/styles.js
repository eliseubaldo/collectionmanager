var gulp = require('gulp'),
    config = require('../config')
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano');

gulp.task('styles', function() {
	return gulp.src(config.paths.css.entry)
	.pipe(sass())
	.pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.paths.css.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest(config.paths.css.dest))
    .pipe(notify({ message: 'Styles task complete' }));
	});
    

