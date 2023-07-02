import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPiazzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ currentPage, category, sorts, order, search }, thunkAPI) => {
    const { data } = await axios.get(
      `https://642ffa0ec26d69edc887f702.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sorts}&order=${order}&${search}`
    );

    console.log(thunkAPI);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // передаются например экшены
  extraReducers: {
    [fetchPiazzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPiazzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPiazzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
