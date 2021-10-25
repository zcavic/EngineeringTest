interface FileResponse {
  success: boolean;
  message: string;
  uploadedFiles: [];
}

class FileService {
  async getFiles(): Promise<FileResponse> {
    const uploadResponse = await fetch('http://localhost:5000/files', {
      method: 'GET',
    });

    const responseJson = await uploadResponse.json();

    if (responseJson.success === false) {
      return {
        success: false,
        message: 'There is some problem with getting files.',
        uploadedFiles: [],
      };
    }

    return {
      success: true,
      message: `${responseJson.uploadedFiles.length} files`,
      uploadedFiles: responseJson.uploadedFiles,
    };
  }
}

export default FileService;
