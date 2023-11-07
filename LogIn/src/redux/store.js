import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice';
const store = configureStore({
  reducer: userSlice,
 
});

export default store;
