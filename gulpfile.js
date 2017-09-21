const gulp  = require('gulp');
const sass  = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('sass', function () {
	return gulp.src( './src/css/style.scss' )
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
});

gulp.task( 'js', function() {
	return gulp.src('./src/js/app.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('sass:watch', function () {
	gulp.watch( './src/css/**/*.scss' , ['sass']);
});

gulp.task('js:watch', function() {
	gulp.watch( './src/js/*.js', ['js'] );
});

gulp.task('default', ['sass:watch', 'js:watch']);