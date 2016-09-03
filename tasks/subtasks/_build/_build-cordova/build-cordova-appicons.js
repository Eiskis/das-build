// Copy app icon assets into native project resource folders
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-appicons', function (callback) {

		// FLAG: should use helpers.getCordovaPlatforms() and check what's needed

		plugins.runSequence(
			'subtask-build-cordova-appicons-android',
			'subtask-build-cordova-appicons-ios',
			'subtask-build-cordova-appicons-osx',
			callback
		);

	});

};
