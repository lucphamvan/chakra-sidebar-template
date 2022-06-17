import { useEffect, useRef } from "react";
import { fetchUser } from "redux/slices/authenSlice";
import { useAppDispatch } from "redux/store";
import usersService from "services/users.service";
import utilService from "services/util.service";

const useAuthen = () => {
    const dispatch = useAppDispatch();
    const timeoutRef = useRef();

    useEffect(() => {
        const init = async () => {
            try {
                // refresh token when enter page
                const refreshToken = utilService.getRefreshToken();
                if (refreshToken) {
                    await usersService.refreshToken(refreshToken);
                }
                // get user information to know authenticate or not
                await dispatch(fetchUser());
            } catch (error: any) {
                console.log(error.message);
            }
        };

        init().then(() => utilService.setupRefreshToken(timeoutRef));
    }, [dispatch]);
};
export default useAuthen;
