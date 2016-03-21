const cjson = Npm.require('cjson');

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


	getImportPathRelativeToFile: function getRealImportPath(importPath, relativeTo) {
		importPath = importPath.replace(/^["']|["']$/g, "");
		var relativePath = relativeTo.replace(/(.*)\/.*/, '$1');
		if (importPath[0] === '~')
			return getModulePath(importPath.substring(1));

		if (importPath[0] === '.')
			importPath = path.join(relativePath, importPath);

		let accPosition = importPath.indexOf('{');
		if (accPosition > -1)
			importPath = importPath.substr(accPosition, importPath.length);

		return importPath;


		function getModulePath(importPath) {
			const nodeModulesDir=`${process.cwd()}/node_modules`;
			if (importPath.match(/\//))
				return `${nodeModulesDir}/${importPath}`;

			const modulePath = `${nodeModulesDir}/${importPath}`;
			const mainFile = cjson.load(`${modulePath}/package.json`).main;
			return `${modulePath}/${mainFile}`;
		}

	}


};
