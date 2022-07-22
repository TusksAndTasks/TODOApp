import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: true,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.auth = !state.auth;
    },
  },
});

export const authorizationReducer = authorizationSlice.reducer;
export const { toggleAuth } = authorizationSlice.actions;
