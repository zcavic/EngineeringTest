import { ChakraProvider } from '@chakra-ui/react' 

import FileUpload from './FileUpload'
import UploadedFiles from './UploadedFiles'
import FileDetails from './FileDetails'

function Main() {
    return (
        <ChakraProvider>
            <FileUpload />
            <UploadedFiles />
            <FileDetails />            
        </ChakraProvider>
    )
}

export default Main