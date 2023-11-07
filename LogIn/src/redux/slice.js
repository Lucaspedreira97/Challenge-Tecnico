import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    user: {},
  };
  
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },//extraReducers
});


//Define una acción asincrónica
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:3001');
  const data = await response.json();
  return data;
});



export default userSlice.reducer;
