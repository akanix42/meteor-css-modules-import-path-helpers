Package.describe({
	name: 'nathantreid:css-modules-import-path-helpers',
	version: '0.1.3',
	// Brief, one-line summary of the package.
	summary: 'Helper Library for package file paths',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/nathantreid/meteor-css-modules-import-path-helpers.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function (api) {
	api.versionsFrom('1.2.0.1');

	api.use('ecmascript');
	api.addFiles('import-path-helpers.js', 'server');
	api.export('ImportPathHelpers', 'server');
});

Package.onTest(function(api){
api.use('nathantreid:css-modules-import-path-helpers');
	api.use(['ecmascript', 'practicalmeteor:mocha@2.4.5_1']);

	api.mainModule('tests.js', 'server')
});

Npm.depends({
	"cjson": "0.3.3",
	"path-is-absolute": "1.0.0",
	"chai": "3.5.0"
});
