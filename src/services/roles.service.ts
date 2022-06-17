import { API } from "config/api";
import http from "config/http";
import utilService from "./util.service";

class RoleService {
    public async getPermissions() {
        try {
            const response = await http.get(API.permissions, {
                headers: {
                    Authorization: "Bearer " + utilService.getAccToken(),
                },
            });
            const permissions = response.data;
            return [permissions, undefined];
        } catch (error: any) {
            return [undefined, error.message];
        }
    }

    public async createRole(name: string, permissions: string[]) {
        try {
            const data = { name, permissions };
            const response = await http.post(API.ROLE.roles, data);
            const role = response.data;
            return [role, undefined];
        } catch (error: any) {
            return [undefined, error.message];
        }
    }
}

export default new RoleService();
