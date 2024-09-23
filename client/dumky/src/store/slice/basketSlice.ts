import { createSlice } from "@reduxjs/toolkit";
import { Goods } from "../../types/types";

interface BasketSlice {
    countBasket: number,
    countLiked: number,
    basket: Goods[],
    liked: Goods[]
}

const initialState: BasketSlice = {
    countBasket: 0,
    countLiked: 0,
    basket: [],
    liked: []
}

const basketSlice = createSlice({
    name:'basketSlice',
    initialState,
    reducers: {
        setCountBasket: (state, {payload}) => {
            state.countBasket = payload
        },
        setCountLiked: (state, {payload}) => {
            state.countLiked = payload
        },
        setBasket: (state, {payload}) => {
            state.basket = payload
        },
        setLiked: (state, {payload}) => {
            state.liked = payload
        }
    }
})

export const {setCountBasket, setCountLiked, setBasket, setLiked} = basketSlice.actions

export default basketSlice.reducer