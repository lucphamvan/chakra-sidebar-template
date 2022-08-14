import { API } from "config/api";
import http from "config/http";
import { File as OrgFile } from "model/File";
import { QueryParam } from "type";

class FileService {
    public async upload(file: File, onUploadProgress?: (e: any) => void | undefined, controller?: AbortController) {
        const formdata = new FormData();
        formdata.append("file", file);
        return http.post(API.FILE.UPLOAD, formdata, {
            onUploadProgress,
            signal: controller?.signal
        });
    }

    public async getFiles(query: QueryParam) {
        if (!query.orderBy || query.orderBy.length === 0) {
            query.orderBy = [{ createdAt: "desc" }];
        }
        return http.get(API.FILE.FILES, {
            params: query
        });
    }

    public async download(file: OrgFile) {
        const response = await http.get(file.url, { responseType: "blob" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([response.data]));
        link.target = "_blank";
        link.download = file.orginalName;
        link.click();
    }

    public async delete(file: OrgFile) {
        return http.delete(API.FILE.FILES + "/" + file.id);
    }

    public async deleteMany(listId: string[]) {
        return http.delete(API.FILE.FILES, {
            params: { id: listId }
        });
    }
}

export default new FileService();
