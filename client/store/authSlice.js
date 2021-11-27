import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    }, 
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const {login, logout} = authSlice.actions;

export const handleAuth = (state) => state.auth.isLoggedIn;

export default authSlice.reducer