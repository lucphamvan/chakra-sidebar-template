import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "model/User";
import usersService from "services/users.service";

type AuthenState = {
    fetching: boolean;
    isAuthen: boolean;
    user: User | undefined;
};
const initialState: AuthenState = {
    fetching: false,
    isAuthen: false,
    user: undefined,
};

export const fetchUser = createAsyncThunk("users/fetch", async () => {
    return usersService.getUserInfo();
});

export const logout = createAsyncThunk("users/logout", async () => {
    return usersService.logout();
});

const authenSlice = createSlice({
    name: "authenSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.fetching = false;
                state.isAuthen = true;
                state.user = action.payload;
            })
            .addCase(fetchUser.pending, (state) => {
                state.fetching = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.fetching = false;
                state.isAuthen = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthen = false;
                state.user = undefined;
            });
    },
});

export default authenSlice.reducer;
