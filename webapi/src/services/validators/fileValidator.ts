let maxFileSizeInBytes: number;

function initializeFileSizeValidator(fileSizeInBytes: number): void {
  maxFileSizeInBytes = fileSizeInBytes;
}

function isFileSizeValid(fileSizeInBytes: number): boolean {
  return fileSizeInBytes <= maxFileSizeInBytes;
}

let validTypes: string[];

function initializeFileTypeValidator(types: string[]): void {
  validTypes = types;
}

function isFileTypeValid(fileType: string): boolean {
  return validTypes.includes(fileType);
}

export { initializeFileSizeValidator, initializeFileTypeValidator, isFileTypeValid, isFileSizeValid };
