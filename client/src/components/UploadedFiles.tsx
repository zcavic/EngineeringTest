import { Box, Text, Flex, Button, Input, createStandaloneToast } from '@chakra-ui/react';
import FileService from '../service/filesService';
import { useEffect, useState } from 'react';

async function UploadedFiles() {
  const [files, setFile] = useState(null);

  const handleUploadedFiles = async () => {
    console.log('Get started.');
    const fileService = new FileService();
    const fileUploadResponse = await fileService.getFiles();
    const toast = createStandaloneToast();
    toast({
      title: fileUploadResponse.success ? 'File fetched' : 'Fetching failed',
      description: fileUploadResponse.message,
      status: fileUploadResponse.success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box width="70%" m="100px auto" padding="5" shadow="base">
      <Flex direction="column" alignItems="center" mb="2">
        <Button size="sm" colorScheme="green" onClick={() => handleUploadedFiles()}>
          Check uploaded videos
        </Button>
      </Flex>
    </Box>
  );
}

export default UploadedFiles;
