import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store';
import { verifyToken } from '@/api/Auth';


interface User {
  user_id : 1;
  username : string;
  name : string;
  mobile: string | number;
  email : string;
  role : string;
  scope: object; 
  created_at : string;
}
interface SessionState {
  isLoaded: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string;
  user: User | null;
  totalScanned : number;
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
  user : null,
  totalScanned : 0
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
    setTotalScanned: (state, action: PayloadAction<number>) => {
      state.totalScanned = action.payload;
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

export const { setAuthentication, revokeAuthentication, setUser, setTotalScanned, setIsLoaded, setIsLoading } = sessionSlice.actions;

export const loadSession = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      const { data } = await verifyToken(token);
      dispatch(setUser({ user_id : data.user_id, name : data.name, username : data.username,  mobile : data.mobile, email : data.email, role : data.role, scope : data.scope,  created_at : data.created_at}));
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
