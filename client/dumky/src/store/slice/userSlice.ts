import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    UserData: {
        name: '',
        surname: '',
        email: '',
        role: ''
    }
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{
        setIsAuth: (state) => {
            state.isAuth = !state.isAuth
        },
        setUserData: (state, {payload}) => {
            state.UserData = {...state.UserData, name: payload.name, surname: payload.surname, email: payload.email, role: payload.role}
        }
    }
})


export const {setIsAuth, setUserData} = userSlice.actions

export default userSlice.reducer