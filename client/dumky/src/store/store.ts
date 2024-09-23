import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./api/goodsApi";
import userSlice from "./slice/userSlice";
import goodsSlice from "./slice/goodsSlice";
import basketSlice from "./slice/basketSlice";

export const store = configureStore({
    reducer:{
        [goodsApi.reducerPath]: goodsApi.reducer,
        userSlice,
        goodsSlice,
        basketSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch