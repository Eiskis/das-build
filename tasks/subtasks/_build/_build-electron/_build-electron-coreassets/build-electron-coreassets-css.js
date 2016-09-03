// Copy compiled styles from core into target folder
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-coreassets-css', function () {

		// Fetch assets to copy
		var files = gulp.src(helpers.getCoreCssFileNames());

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (css for electron): '
			})))

			// We want a single file
			.pipe(plugins.concat('app.css'))

			.pipe(gulp.dest(config.targets['electron'] + config.buildOptions.coreAssetPath));
	});

};
