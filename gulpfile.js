var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

    gulp.task('styles', function() {
  	return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
	});

	gulp.task('scripts', function() {
  	return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/app'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/app'))
    .pipe(notify({ message: 'Scripts task complete' }));
	});

    gulp.task('views', function(){
        gulp.src('index.html')
        .pipe(gulp.dest('dist'));
        gulp.src('views/**/*')
        .pipe(gulp.dest('dist/views/'));
    });

	gulp.task('watch', function() {
	  // Watch .scss files
	  gulp.watch('src/styles/**/*.scss', ['styles']);
	  // Watch .js files
	  gulp.watch('app/**/*.js', ['scripts']);
      // Views
      gulp.watch('app/views/**/*.html', ['views']);
      gulp.watch('index.html', ['views']);

	});