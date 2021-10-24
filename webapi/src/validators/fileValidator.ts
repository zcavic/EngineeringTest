export class FileSizeValidator {
  private maxFileSizeInBytes: number;

  constructor(maxFileSizeInBytes: number) {
    this.maxFileSizeInBytes = maxFileSizeInBytes;
  }

  validateFileSize(fileSizeInBytes: number): boolean {
    return fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage(): string {
    return `Maximum file size accepted is ${this.maxFileSizeInBytes} bytes.`;
  }
}

export class FileTypeValidator {
  private validTypes: string[];

  constructor(validTypes: string[]) {
    this.validTypes = validTypes;
  }

  validateFileType(fileType: string): boolean {
    return this.validTypes.includes(fileType);
  }

  getErrorMessage(): string {
    return `Not an accepted file type. Acceptable types: ${this.validTypes.toString()}`;
  }
}
