import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById', // Id отображается в dev tools и должен быть уникальный у каждого thunk
    async (userId) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        // const response = await axios.get(getUserUrl(userId));
        // return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: 0,
        username: null,
        token: null
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        login: (state, action) => {
            console.log(action.payload);
            return 1;
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer