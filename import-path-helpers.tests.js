import chai from 'chai';

chai.should();

describe('ImportPathHelpers', () => {
	describe('getAbsoluteImportPath', () => {

		it('should return the input path if the input is absolute', () => {
			const inputPath = 'C:/test';
			const outputPath = ImportPathHelpers.getAbsoluteImportPath(inputPath);
			outputPath.should.equal(inputPath);
		});

		it('should return an absolute path if the input is relative', () => {
			const inputPath = 'test';
			ImportPathHelpers.basePath = 'C:/'
			const outputPath = ImportPathHelpers.getAbsoluteImportPath(inputPath);
			outputPath.should.equal('C:/test');
		});

		it('should convert backslashes to forward slashes', () => {
			const inputPath = 'C:\\test';
			const outputPath = ImportPathHelpers.getAbsoluteImportPath(inputPath);
			outputPath.should.equal('C:/test');
		});

	});

	describe('getAppRelativeImportPath', () => {

		it('should return the input path as an "absolute" path with the app base path as the root', () => {
			const inputPath = 'C:/test/hello';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getAppRelativeImportPath(inputPath);
			outputPath.should.equal('/hello');
		});

	});

	describe('getImportPathRelativeToFile', () => {

		it('should return absolute path when supplied absolute path', () => {
			const inputPath = 'C:/test/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/hello');
		});

		it('should return absolute path to file in same directory', () => {
			const inputPath = './hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/hello');
		});

		it('should return absolute path to file in same directory without ./', () => {
			const inputPath = 'hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/hello');
		});

		it('should return absolute path to file in parent directory', () => {
			const inputPath = '../hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/hello');
		});

		it('should return absolute path to file in child directory', () => {
			const inputPath = './world/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/world/hello');
		});

		it('should return absolute path to node modules file', () => {
			const inputPath = '~world/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/node_modules/world/hello');
		});

		it('should return absolute path to curly-syntax non-package path', () => {
			const inputPath = '{}/world/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/world/hello');
		});

		it('should return absolute path to curly-syntax package path without colon', () => {
			const inputPath = '{my_package}/world/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/packages/my_package/world/hello');
		});

		it('should return absolute path to curly-syntax package path without colon', () => {
			const inputPath = '{my:package}/world/hello';
			const relativeTo = 'C:/test/other';
			ImportPathHelpers.basePath = 'C:/test';
			const outputPath = ImportPathHelpers.getImportPathRelativeToFile(inputPath, relativeTo);
			outputPath.should.equal('C:/test/packages/my_package/world/hello');
		});

	});
});
