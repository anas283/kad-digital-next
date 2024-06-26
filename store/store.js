import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeReducer';

export default configureStore({
  reducer: {
    theme: themeReducer,
  },
})