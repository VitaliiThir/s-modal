module.exports = function() {
	$.gulp.task('watch', function() {
		$.gulp.watch($.path.watch.html,{usePolling: true}, $.gulp.series('html'));
		$.gulp.watch($.path.watch.sass,{usePolling: true}, $.gulp.series('sass'));
		$.gulp.watch($.path.watch.js,{usePolling: true}, $.gulp.series('js'));
		$.gulp.watch($.path.watch.fonts,{usePolling: true}, $.gulp.series('fonts'));
	});
};