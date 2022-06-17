import http from "config/http";
import { API } from "config/api";
import utilService from "./util.service";

class UserService {
    public async setRole(userId: string, roleId: string) {
        try {
            const data = { userId, roleId };
            const response = await http.post(API.USER.assignRole, data);
            return [response.data, undefined];
        } catch (error: any) {
            return [undefined, error.message];
        }
    }

    public async getUserInfo() {
        // get access token from local storage
        const token = utilService.getAccToken();
        if (!token) {
            console.log("no access token");
            throw Error("no access token");
        }
        // call api
        const response = await http.get(API.USER.authen, {
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        return response.data;
    }

    public async login(email: string, password: string) {
        const data = { email, password };
        const response = await http.post(API.USER.login, data);
        utilService.saveAccToken(response.data.accToken);
        utilService.saveRefreshToken(response.data.refToken);
        return response.data;
    }

    public async refreshToken(token: string) {
        const data = { token };
        const response = await http.post(API.USER.refreshToken, data);
        utilService.saveAccToken(response.data.accToken);
    }
}

export default new UserService();
