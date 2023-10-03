import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/ProductsSlice";
import sideBarReducer from "./feature/sideBarSlice";
import cartReducer from './feature/cartSlice'

export const store = configureStore({
  reducer: {
    cart:cartReducer,
    products: productReducer,
    sidebar: sideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
