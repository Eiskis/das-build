// Copy public assets from root into target folder
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window-public', function () {

		// Fetch files to copy
		var files = gulp.src([
			config.source.public + '**/*'
		], {
			base: config.source.public
		});

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (public for window): '
			})))

			.pipe(gulp.dest(config.targets['window'] + config.targets.public));
	});

};