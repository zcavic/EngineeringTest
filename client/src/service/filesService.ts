interface FileResponse {
    success: boolean;
    message: string,
    uploadedFiles: [];
  }
  
  class FileService {

    async getFiles(): Promise<FileResponse> {
      const uploadResponse = await fetch('http://localhost:5000/files', {
        method: 'GET'
      });
  
      const responseJson = await uploadResponse.json();
  
      if (responseJson.success === false) {
        return {
          success: false,
          message: 'Uploaded Successfully',
          uploadedFiles: []
        };
      }
  
      return {
        success: true,
        message: 'Uploaded Successfully',
        uploadedFiles: responseJson.uploadedFiles
      };
    }
  }
  
  export default FileService;
  