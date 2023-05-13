
import http from '@/helpers/http-common';

const upload = ({ file }: {file: File}, onUploadProgress: (event: any) => void) => {
    let formData = new FormData();

    formData.append("file", file);
    
    return http.post('/api/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
    });
}

const getFiles = () => {
    return http.get('/api/file');
}

const deleteFile = () => {
    return http.delete('/api/file', {
    });
}

export default {
    upload,
    get: getFiles,
    delete: deleteFile
}