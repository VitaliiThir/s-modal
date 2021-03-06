'use strict';

global.$ = {
	gulp: require('gulp'),
	loadPlugin: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	gcmq: require('gulp-group-css-media-queries'),
	gscc: require('gulp-strip-css-comments'),
	path: {
		tasks: require('./gulp/config/tasks.js'),
		build: {
			html: 'build/',
			css: 'build/css/',
			js: 'build/js/',
			fonts: 'build/fonts/'
		},
		src: {
			html: 'src/*.html',
			sass: 'src/sass/*.scss',
			js: 'src/js/*.js',
			fonts: 'src/fonts/**/*.*'
		},
		watch: {
			html: ['src/*.html', 'src/template/*.html'],
			sass: 'src/sass/*.scss',
			js: 'src/js/*.js',
			fonts: 'src/fonts/**/*.*'
		}
	},
};

$.path.tasks.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	$.gulp.parallel('html', 'sass', 'js', 'fonts'),
	$.gulp.parallel('watch', 'server')
	)
);