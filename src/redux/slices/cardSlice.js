import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItemId = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItemId) {
        findItemId.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    increaseItem(state, action) {
      const findItemId = state.items.find((obj) => obj.id === action.payload);

      if (findItemId) {
        findItemId.count++;
      }
    },
    decreaseItem(state, action) {
      const findItemId = state.items.find((obj) => obj.id === action.payload);

      if (findItemId && findItemId.count > 1) {
        findItemId.count--;
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    setTotalPrice(state) {
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const {
  addItem,
  decreaseItem,
  increaseItem,
  removeItem,
  clearItems,
  setTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
