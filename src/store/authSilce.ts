import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLogged: boolean;
}

// localStorage'dan holatni olish funksiyasi
const getInitialAuthState = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : { isLogged: false };
};

const initialState: AuthState = getInitialAuthState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    setIsLoggedOut: (state) => {
      state.isLogged = false;
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

export const { setIsLogged, setIsLoggedOut } = authSlice.actions;
export default authSlice.reducer;
