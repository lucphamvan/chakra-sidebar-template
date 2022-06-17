import jwtDecode from "jwt-decode";
import usersService from "./users.service";

class UtilService {
    public saveAccToken(token: string) {
        localStorage.setItem("acc", token);
    }

    public getAccToken() {
        return localStorage.getItem("acc");
    }

    public saveRefreshToken(token: string) {
        localStorage.setItem("ref", token);
    }

    public getRefreshToken() {
        return localStorage.getItem("ref");
    }

    public setupRefreshToken(timeoutRef: any) {
        // clear timeout
        clearTimeout(timeoutRef);
        // get token from localstorage
        const refToken = this.getRefreshToken();
        const token = this.getAccToken();
        // setup
        if (refToken) {
            let timeout;
            // calculate timeout
            try {
                const jwtInfo = jwtDecode(token || "") as any;
                timeout = jwtInfo.exp * 1000 - Date.now() - 3000;
            } catch (error) {
                timeout = 0;
            }
            // set timeout to refresh token
            timeoutRef.current = setTimeout(async () => {
                await usersService.refreshToken(refToken);
                this.setupRefreshToken(timeoutRef);
            }, timeout);
        }
    }
}

export default new UtilService();
