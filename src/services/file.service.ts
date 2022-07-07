import { API } from "config/api";
import http from "config/http";

class FileService {
    public async upload(file: File, onUploadProgress: (e: any) => void | undefined, controller: AbortController) {
        const formdata = new FormData();
        formdata.append("file", file);
        return http.post(API.FILE.UPLOAD, formdata, {
            onUploadProgress,
            signal: controller.signal,
        });
    }
}

export default new FileService();
