import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "model/User";

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
    const user: User = { id: "1", email: "fake@gmail.com", name: "fake" };
    return user;
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
            });
    },
});

export default authenSlice.reducer;
