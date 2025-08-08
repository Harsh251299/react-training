import { configureStore } from "@reduxjs/toolkit";
import { TodoSliceRTKThunk } from "./TodoSliceRTKThunk";

const store = configureStore({
  reducer: {
    todos: TodoSliceRTKThunk.reducer,
  },
});

export default store;