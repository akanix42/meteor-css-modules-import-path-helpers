var XRegExp = Npm.require('xregexp');
var path;

ImportPathHelpers = {
	init: function (plugin) {
		path = plugin.path;
	},

	getImportPathInPackage: function getAbsoluteImportPath(inputFile) {
		if (inputFile.getPackageName() === null) {
			return '{}/' + inputFile.getPathInPackage();
		}
		return '{' + inputFile.getPackageName() + '}/'
			+ inputFile.getPathInPackage();
	},


	getImportPathInBundle: function getAbsoluteImportPath(inputFile) {
		var packageAndPathExpression = XRegExp('^(?<package>app|(packages/(.*?)))/(?<pathInPackage>.*)');
		var inputFilePath = inputFile.getPathInBundle();
		var packageAndPath = XRegExp.exec(inputFilePath, packageAndPathExpression);

		var package = packageAndPath.package.replace(/^(app|packages\/)/, '');
		console.log(`{${package}}/${packageAndPath.pathInPackage}`);
		return `{${package}}/${packageAndPath.pathInPackage}`;
	},


	getImportPathRelativeToFile: function getRealImportPath(importPath, relativeTo) {
		importPath = importPath.replace(/^["']|["']$/g, "")
		var relativePath = relativeTo.replace(/(.*)\/.*/, '$1');
		if (importPath[0] === '.')
			importPath = path.join(relativePath, importPath);

		let accPosition = importPath.indexOf('{');
		if (accPosition > -1)
			importPath = importPath.substr(accPosition, importPath.length);

		return importPath;
	}


};
