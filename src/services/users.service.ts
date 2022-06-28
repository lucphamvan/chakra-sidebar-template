import http from "config/http";
import { API } from "config/api";
import utilService from "./util.service";

class UserService {
    public async setRole(userId: string, roleId: string) {
        try {
            const data = { userId, roleId };
            const response = await http.post(API.USER.ASSIGN_ROLE, data);
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
        const response = await http.get(API.USER.AUTHEN);
        return response.data;
    }

    public async login(email: string, password: string) {
        const data = { email, password };
        const response = await http.post(API.USER.LOGIN, data);
        utilService.saveAccToken(response.data.accToken);
        utilService.saveRefreshToken(response.data.refToken);
        return response.data;
    }

    public async logout() {
        const acc = utilService.getAccToken();
        const ref = utilService.getRefreshToken();
        const data = { acc, ref };
        await http.post(API.USER.LOGOUT, data);
        utilService.removeToken();
    }

    public async refreshToken() {
        const token = utilService.getRefreshToken();
        const data = { token };
        const response = await http.post(API.USER.REFRESH_TOKEN, data);
        utilService.saveAccToken(response.data.accToken);
    }

    public async signup(name: string, email: string, password: string) {
        const data = { name, email, password };
        await http.post(API.USER.USERS, data);
    }

    public async checkUserEmail(email: string) {
        const data = { email };
        let result = false;
        try {
            result = await (await http.post(API.USER.CHECK_EMAIL, data)).data;
        } catch (error: any) {
            console.log("failed to check email", error.message);
        }
        return result;
    }

    public async updateUser(name: string) {
        const data = { name };
        const response = await http.put(API.USER.USERS, data);
        return response.data;
    }
}

export default new UserService();
