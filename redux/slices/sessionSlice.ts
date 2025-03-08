import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store';


interface User {
  user_id : 1;
  username : string;
  mobile: string | number;
  email : string;
  role : string;
  scope: object; 
  created_at : string,
}
interface SessionState {
  isLoaded: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string;
  user: User | null;
}

interface AuthState {
  isAuthenticated: boolean;
  authToken: string;
}

const initialState: SessionState = {
  isLoaded: false,
  isLoading: true,
  isAuthenticated: false,
  authToken: '',
  user : null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.authToken = action.payload.authToken;
    },
    revokeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = state.user ? { ...state.user , ...action.payload }: action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
      if(action.payload){
        state.isLoading = action.payload;
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuthentication, revokeAuthentication, setUser, setIsLoaded, setIsLoading } = sessionSlice.actions;

export const loadSession = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      dispatch(setAuthentication({ isAuthenticated: true, authToken: token }));
    } else {
      dispatch(setAuthentication({ isAuthenticated: false, authToken: '' }));
    }
    dispatch(setIsLoaded(true));
  } catch (error) {
    console.error('Failed to load session:', error);
    dispatch(setAuthentication({ isAuthenticated: false, authToken: '' }));
    dispatch(setIsLoaded(true));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export default sessionSlice.reducer;
