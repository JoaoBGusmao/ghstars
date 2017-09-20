var gulp = require('gulp');
var sass = require('gulp-sass');

const cssSource = './src/css/style.scss';

gulp.task('sass', function () {
	return gulp.src( cssSource )
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
	gulp.watch( cssSource , ['sass']);
});