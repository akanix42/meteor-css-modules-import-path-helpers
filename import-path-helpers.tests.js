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
});
