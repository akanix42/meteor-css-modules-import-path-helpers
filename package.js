Package.describe({
	name: 'nathantreid:css-modules-import-path-helpers',
	version: '0.0.1',
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
	api.addFiles('import-path-helpers.js');
	api.export('ImportPathHelpers');
});
