import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY_PRODUCTS: string = "LOCAL_STORAGE_KEY_PRODUCTS";


interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductsSlice {
  products: Product[];
}

const initialState: ProductsSlice = {
  products: [],
};


const updateLocalStorage = (products: Product[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      updateLocalStorage(action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
      updateLocalStorage(state.products);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const newProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });

      state.products = newProducts;
      updateLocalStorage(state.products);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const newProducts = state.products.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return item;
        }
      });

      state.products = newProducts
      updateLocalStorage(state.products);
    },
  },
});

export const { setProducts, addProduct, deleteProduct,editProduct } = productsSlice.actions;

export default productsSlice.reducer;
