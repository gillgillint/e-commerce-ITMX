import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY_CARTS: string = "LOCAL_STORAGE_KEY_CARTS";

interface Cart {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
}

export interface CartSlice {
  items: Cart[];
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartSlice = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const updateLocalStorage = (cartState: CartSlice) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_CARTS, JSON.stringify(cartState));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<CartSlice>) => {
      state.items = action.payload.items;

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);

      state.totalPrice = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);

      updateLocalStorage({
        items: [...state.items],
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice,
      });
    },
    addToCart: (state, action: PayloadAction<Cart>) => {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem) {
        const newCart = [...state.items].map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: existingCartItem.amount + 1,
            };
          } else {
            return item;
          }
        });
        state.items = newCart;
      } else {
        state.items = [...state.items, action.payload];
      }

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);

      state.totalPrice = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);

      updateLocalStorage({
        items: [...state.items],
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice,
      });
    },
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingCartItem) {
        const newCart = state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          } else {
            return item;
          }
        });
        state.items = newCart;
      }

      if (existingCartItem?.amount === 1) {
        const newCart = state.items.filter((item) => {
          return item.id !== action.payload;
        });
        state.items = newCart;
      }

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      state.totalPrice = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);

      updateLocalStorage({
        items: [...state.items],
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const newCart = state.items.filter((item) => {
        return item.id !== action.payload;
      });

      state.items = newCart;

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      state.totalPrice = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);

      updateLocalStorage({
        items: [...state.items],
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice,
      });
    },
    editCart: (state, action: PayloadAction<Cart>) => {
      const newCart = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action.payload, amount: item.amount };
        } else {
          return item;
        }
      });

      state.items = newCart;

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      state.totalPrice = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);

      updateLocalStorage({
        items: [...state.items],
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice,
      });
    },
    clearCart: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY_CARTS);
      return initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseAmount,
  editCart,
  setCarts,
} = cartSlice.actions;

export default cartSlice.reducer;
