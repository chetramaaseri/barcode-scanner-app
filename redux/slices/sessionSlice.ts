import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
  authToken: String
}

const initialState: SessionState = {
    isAuthenticated: false,
    authToken: ""
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<SessionState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.authToken = action.payload.authToken;
    },
    revokeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.authToken = "";
    }
  },
});

export const { setAuthentication, revokeAuthentication } = sessionSlice.actions;
export default sessionSlice.reducer;
