import { createSlice } from '@reduxjs/toolkit'
import { Goods } from '../../types/types'

interface IGoodsSlice {
    Goods: Goods[]
    catalogId: number
    value: string
}

const initialState: IGoodsSlice = {
    Goods: [],
    catalogId: 1,
    value: '',
}

const goodsSlice = createSlice({
    name: 'goodsSlice',
    initialState,
    reducers: {
        setGoods: (state, { payload }) => {
            state.Goods = payload
        },
        setCatalogId: (state, { payload }) => {
            state.catalogId = payload
        },
        setValue: (state, { payload }) => {
            state.value = payload
        },
    },
})

export const { setGoods, setCatalogId, setValue } = goodsSlice.actions

export default goodsSlice.reducer
