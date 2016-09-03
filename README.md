# Das Build

Project pipeline for building an app for the browser and wrap it into natice apps with Cordova and Electron.

## Dependencies

- `node` and `npm`
- `ios-sim` and `ios-deploy` for Cordova's iOS builds.



## Using the project pipeline

This project is build on `npm`. You can use the `npm run` command to run the routines defined on `package.json`. These routines in turn call `gulp`, `bower`, `cordova` and `electron` tasks.

Here are some scripts you might want to use:

```
"scripts": {
	"clear": "gulp clear",
	"build": "gulp build",
	"init": "npm install && gulp init",
	"devbuild": "gulp build --debug",
	"watch": "gulp watch --debug",
	"purge": "gulp uninit && rm -rf node_modules",
	"update": "bower prune && bower update",
	"init-cordova": "gulp init-cordova",
	"build-cordova": "gulp build-cordova",
	"devbuild-cordova": "gulp build-cordova --debug",
	"purge-cordova": "gulp uninit-cordova",
	"watch-cordova": "gulp watch-cordova --debug",
	"build-android": "gulp build-cordova --cordovaplatform android",
	"devbuild-android": "gulp build-cordova --cordovaplatform android --debug",
	"watch-android": "gulp watch-cordova --cordovaplatform android --debug",
	"build-ios": "gulp build-cordova --cordovaplatform ios",
	"devbuild-ios": "gulp build-cordova --cordovaplatform ios --debug",
	"watch-ios": "gulp watch-cordova --cordovaplatform ios --debug",
	"build-osx": "gulp build-electron --electronplatform osx",
	"devbuild-osx": "gulp build-electron --electronplatform osx --debug",
	"android-list": "cd cordova && cordova run android --list",
	"android": "cd cordova && cordova emulate android --nobuild --emulator",
	"android-device": "cd cordova && cordova run android --nobuild --device",
	"ios-list": "cd cordova && cordova run ios --list",
	"ios-device": "cd cordova && cordova run ios --nobuild --device",
	"ios": "cd cordova && cordova emulate ios --nobuild --emulator",
	"ios-5": "cd cordova && cordova emulate ios --nobuild --target=iPhone-5s",
	"ios-6": "cd cordova && cordova emulate ios --nobuild --target=iPhone-6s",
	"ios-6p": "cd cordova && cordova emulate ios --nobuild --target=iPhone-6s-Plus",
	"requirements": "cd cordova && cordova requirements"
}
```



### Get started

Go to the folder you would like to use for your project, then install Das Build:

	npm install das-build --save-dev

THen you can initialize your project:

	npm run init

This will install the `node_modules` needed by the gulp pipeline. `bower_components` defined in `bower.json` will also be fetched so they can be built in the app package. For more info on Bower, see below.

To build the browser version of the app for development, use:

	npm run watch

This will build the templates, scripts, styles and assets as defined by the build pipeline and `project.json`. The script will remain active and rebuild as you make edits to the source files. An independent build will be available under `/window`.

You can make a one-off client builds:

	# Development version
	npm run devbuild

	# Production version with minified assets
	npm run build

If you wish to run individual gulp tasks without the abstraction provided by `package.json` script, you can use the locally available gulp binary instead of having to install gulp globally:

	node_modules/gulp/bin/gulp.js subtask-build-window-coreassets

All gulp tasks can be found under `gulp/`.



## Bower

Bower is a separate dependency management for fetching client-side libraries that will be delivered to users as part of the app package. You can and should (un)install these components during development as you change what libraries the client logic relies on.

To use Bower locally, you don't have to install it since it's already included in `node_modules` as part of the build pipeline. Use it like so:

	node_modules/bower/bin/bower install es6-promise --save



## Cordova

Cordova is a tool for compiling web apps such as this into mobile projects, running them in web views and providing platform features as plugins to the client code.

This project pipeline includes commands building this project on iOS using Cordova.

Due to some caveats with using `npm run` for controlling the build pipeline and how Cordova commands are structured, Cordova commands provided as `npm` scripts do not work. You need to manually control Cordova from its own working directory.

	# This is part of init but you can run this to regenerate the mobile project base
	npm run init

	# Make a client app build targeted to Cordova (to cordova/www/)
	npm run build-cordova

	# Make sure you're in the right directory
	cd cordova

	# Make sure your environment fills the requirements for running the build
	../node_modules/cordova/bin/cordova requirements

	# List emulator images available in your environment
	../node_modules/cordova/bin/cordova run ios --list

	# Run project on emulator or device
	../node_modules/cordova/bin/cordova run --list
	../node_modules/cordova/bin/cordova run ios --nobuild --device
	../node_modules/cordova/bin/cordova run ios --nobuild --emulator
	../node_modules/cordova/bin/cordova run ios --target=iPhone-6s



# Client code

## Viewmodels

In each view model, the following variables are available.

	# Consistent variable referring to the view model itself
	self

	# Parameters passed to the view model instance in parent template
	params
	element
	templateNodes
	veight
	app



# Assets

## SVG icons

SVG icons are built into an SVG sprite from under `source/svg/` (defined in `project.json`).

## iOS app icons and launch images

iOS relies on an extensive set of specifically named and sized PNG icons and splash screens for its apps. For each iOS build we copy these assets from under source folders that should match the native project configuration.

### App icons

	# copied from "source/ios/icons/",
	# under "cordova/platforms/ios/Project Title/Images.xcassets/AppIcon.appiconset/",
	# check "cordova/platforms/ios/Project Title/Images.xcassets/AppIcon.appiconset/Contents.json"

	icon-40.png
	icon-40@2x.png
	icon-50.png
	icon-50@2x.png
	icon-60@2x.png
	icon-60@3x.png
	icon-72.png
	icon-72@2x.png
	icon-76.png
	icon-76@2x.png
	icon-83.5@2x.png
	icon-small.png
	icon-small@2x.png
	icon-small@3x.png
	icon.png
	icon@2x.png

### Splash screens

	# copied from "source/ios/splash/",
	# under "cordova/platforms/ios/Project Title/Images.xcassets/LaunchImage.launchimage/",
	# check "cordova/platforms/ios/Project Title/Images.xcassets/LaunchImage.launchimage/Contents.json"

### Fonts

- Web font files are included in the package.
- Font files are under `source/public/fonts/`.
- Only the fonts that are actually in use are included. Others are in store under `assets/`
- CSS definitions are under `source/styles/webfonts/`



## Good to know

- `npm run watch` cannot watch `project.json` - restart when making changes to this file.
- Sometimes you might get build errors on iOS from the "dialogs" Cordova plugin. Running init and build again fixes this usually.
- Copying the app icons and launch images to the app package while deploying sometimes fails. Redeploying should help.
- When deploying to an iOS device, usually the script hangs and the app freezes. There seems to be a bug in Cordova related to hiding the splash screen. Kill the script, the app process on the device and remove the cable, and you can launch the app.
- The preferences `DisallowOverscroll`, `SuppressesLongPressGesture` and `Suppresses3DTouchGesture` might cause issues with event handling/triggering. If you have issues with click events not firing, try messing with those.



# DEPRECATED BELOW THIS LINE!!

See `do/` for scripts that handle project-level tasks while developing.

Normally you probably want to use `do/watch` to watch for changes in the source code and automatically build a browser version as you make changes.

## Project dependencies

- Base dependencies and build pipeline: `npm`
- For launching iOS emulator from command line: `ios-sim`
- For installing and debug iPhone apps from the command line: `ios-deploy`

## Client-side libraries

See `bower.json` and `source/`.



## Build pipeline

The build pipeline is quite powerful and supports multiple targets. `source/` is compiled into `core/`, the latter of which is then still recompiled for various build targets - along with `public/` assets.

The gulp tasks you are supposed to be using are found under `gulp/routines/`. These serve as an API for running the individual subtasks that are needed for each use case. Routines only depend on subtasks, not each other, and contain no logic other than running subtasks.

For example, there is a subtask for building the browser version, but the *routine* actually knows how to prune the project folder before building a new version. Things get more complicated with dependencies between build targets and watching for changed source files in order to automatically recompile.



## Deployment

Using [Flightplan](https://github.com/pstadler/flightplan) for deploying browser version to remote servers?

When deploying the browser version on a server, make sure that the server is equipped to serve all the static assets with correct mime types. Especially the *appcache* manifest file.

	AddType text/cache-manifest .appcache

*UPDATE:* `.appcache` is deprecated, and toggled of in gulp.

### iOS

Use `npm run` commands to deploy the Cordova build to a simulator or device.

When deploying, app icons are sometimes not updated. Keep building and deploying, eventually they'll update.
