import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../components/BookList/BookList.queries";

const initialState: { books: Book[] } = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, payload) => {
      console.log(payload.payload);
      state.books.push(payload.payload);
    },
    removeBook: (state, payload) => {
      state.books = state.books.filter((book) => book.id !== payload.payload);
    },
  },
});

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
