import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  status: string;
  uid: string | null | undefined;
  email: string | null | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  errorMessages: string | null | undefined;
}

const initialState: authState = {
  status: "checking", // not-authenticated,checking, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessages: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authState>) => {
      state.status = action.payload.status;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessages = action.payload.errorMessages;
    },
    //!En el payload no recibimos un objeto sino un dato primitivo string
    logout: (state, action: PayloadAction<string>) => {
      (state.status = "not-authenticated"), // not-authenticated,checking, authenticated
        (state.uid = null),
        (state.email = null),
        (state.displayName = null),
        (state.photoURL = null);
      state.errorMessages = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
