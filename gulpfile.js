var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var gutil = require('gulp-util');
var uncss = require('gulp-uncss');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
var includer = require('gulp-x-includer');
var critical = require('critical').stream;
var sourcemaps = require('gulp-sourcemaps');
var prettify = require('gulp-html-prettify');
var autoprefixer = require('gulp-autoprefixer');

// check if --production flag is passed
var Production = gutil.env.production === true;

// work on sass files
gulp.task('sass', function () {
	var paths = [
		'./resources/assets/sass',
		'./bower_components'
	];

	gulp.src('./resources/assets/sass/**/*.scss')
		.pipe(Production ? gutil.noop() : sourcemaps.init())

		.pipe(sass({includePaths: paths, sourceComments: true}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(Production ? gutil.noop() : sourcemaps.write('./'))

		.pipe(Production ? concat('app.css') : gutil.noop())
		.pipe(Production ? cssnano() : gutil.noop())
		.pipe(Production ? rename({suffix: '.min'}) : gutil.noop())

		.pipe(debug({title: 'Output:'}))
		.pipe(size({title: 'Size:'}))
		.pipe(notify("Created File: <%= file.relative %>!"))
		.pipe(gulp.dest('./public/css/'));
});

// work on html files
gulp.task('html', function () {
	gulp.src('./resources/views/*.html')
		.pipe(includer())
		.pipe(prettify({indent_size: 4}))

		.pipe(debug({title: 'Output:'}))
		.pipe(size({title: 'Size:'}))
		.pipe(notify("Created File: <%= file.relative %>!"))
		.pipe(gulp.dest('./public/'));
});

// watch sass files
gulp.task('watch:sass', ['sass'], function () {
	gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);
});

// watch html files
gulp.task('watch:html', ['html'], function () {
	gulp.watch('./resources/views/**/*.html', ['html']);
});

// optimize css
gulp.task('optimize', function () {
	gulp.src('./public/css/*.css')
		.pipe(uncss({html: './public/*.html'}))
		.pipe(gulp.dest('./public/css'));
});

// critical css
gulp.task('critical', function () {
	gulp.src('./public/*.html')
		.pipe(critical({
			inline: false,
			base: './public/',
			css: ['./public/css/app.css'],
			minify: true,
			width: 1920,
			height: 1080
		}))
		.pipe(rename({basename: 'critical'}))
		.pipe(gulp.dest('./public/css/'));
});

// publish css
gulp.task('publish', ['optimize', 'critical']);

// default gulp
gulp.task('default', ['watch:html', 'watch:sass']);