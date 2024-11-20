import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);  
    },
    setUser: (state, action) => {
      state.users = action.payload;  
    },
  },
});

export const { addUser, setUser } = userSlice.actions;
export default userSlice.reducer;