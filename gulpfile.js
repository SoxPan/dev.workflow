var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// check if --production flag is passed
var Production = gutil.env.production === true;

// work on sass files
gulp.task('sass', function () {
	gulp.src('./resources/assets/sass/**/*.scss')
		.pipe(Production ? gutil.noop() : sourcemaps.init())

		.pipe(sass({
			includePaths: [
				'./resources/assets/sass',
				'./bower_components'
			]
		}).on('error', sass.logError))
		.pipe(autoprefixer())

		.pipe(Production ? gutil.noop() : sourcemaps.write())

		.pipe(Production ? concat('app.css') : gutil.noop())
		.pipe(Production ? cssmin() : gutil.noop())
		.pipe(Production ? rename({suffix: '.min'}) : gutil.noop())

		.pipe(debug({title: 'Output:'}))
		.pipe(size({title: 'Size:'}))
		.pipe(notify("Created File: <%= file.relative %>!"))
		.pipe(gulp.dest('./public/css/'));
});

// watch sass files
gulp.task('sass:watch', function () {
	gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);
});