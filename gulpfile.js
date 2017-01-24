var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

// build css

gulp.task('styles', function() {
    gulp.src('./application/static/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./application/static/css/'))
});

//load components

gulp.task('load-components', function () {
	load_bower_components();
	load_custom_components();
});
gulp.task('wiredep', load_bower_components);
gulp.task('inject', load_custom_components);


// default task

gulp.task('default',function() {
    gulp.watch('./application/static/sass/**/*.scss',['styles']);		// build css files
});


// functions 

function load_bower_components() {
	var wiredep = require('wiredep').stream;
	gulp.src('./application/templates/layout/*.html')
		.pipe(wiredep({
		   'ignorePath': '../../'
		}))
		.pipe(gulp.dest('./application/templates/layout'));
}

function load_custom_components() {
	var target = gulp.src('./application/templates/layout/main.html');
	var sources = gulp.src(['./application/static/js/**/*.js', './application/static/css/**/*.css'], {read: false});

	return target.pipe(inject(sources, {'ignorePath': 'application/'}))
			.pipe(gulp.dest('./application/templates/layout'));
}