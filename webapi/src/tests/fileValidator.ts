import {
  initializeFileSizeValidator,
  initializeFileTypeValidator,
  isFileTypeValid,
  isFileSizeValid,
} from '../services/validators/fileValidator';
import { expect } from 'chai';

describe('File size validator', () => {
  it('Valid file size', () => {
    initializeFileSizeValidator(10);
    expect(isFileSizeValid(5)).to.equal(true);
  });
  it('Invalid file size file size', () => {
    initializeFileSizeValidator(5);
    expect(isFileSizeValid(10)).to.equal(false);
  });
});

describe('File size validator', () => {
  it('Valid file size', () => {
    initializeFileTypeValidator(['.mp4']);
    expect(isFileTypeValid('.mp4')).to.equal(true);
  });
  it('Invalid file size file size', () => {
    initializeFileTypeValidator(['.avi']);
    expect(isFileTypeValid('.mp4')).to.equal(false);
  });
});
