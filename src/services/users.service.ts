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
        const response = await http.get(API.USER.authen);
        return response.data;
    }

    public async login(email: string, password: string) {
        const data = { email, password };
        const response = await http.post(API.USER.login, data);
        utilService.saveAccToken(response.data.accToken);
        utilService.saveRefreshToken(response.data.refToken);
        return response.data;
    }

    public async logout() {
        const acc = utilService.getAccToken();
        const ref = utilService.getRefreshToken();
        const data = { acc, ref };
        await http.post(API.USER.logout, data);
        utilService.removeToken();
    }

    public async refreshToken() {
        const token = utilService.getRefreshToken();
        const data = { token };
        const response = await http.post(API.USER.refreshToken, data);
        utilService.saveAccToken(response.data.accToken);
    }

    public async signup(name: string, email: string, password: string) {
        const data = { name, email, password };
        await http.post(API.USER.users, data);
    }

    public async checkUserEmail(email: string) {
        const data = { email };
        let result = false;
        try {
            result = await (await http.post(API.USER.checkEmail, data)).data;
        } catch (error: any) {
            console.log("failed to check email", error.message);
        }
        return result;
    }
}

export default new UserService();
