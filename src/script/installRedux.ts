import { execSync } from "child_process";
import fs from "fs-extra";
export default function installRedux() {
  console.log("Installing Redux...");
  execSync("npm install @reduxjs/toolkit react-redux", {
      stdio: "inherit",
  });

  console.log("Creating store folder in src...");
  fs.ensureDirSync("./src/redux/reducers");
  fs.writeFileSync("./src/redux/store.ts", storeFileSource);
  fs.writeFileSync("./src/redux/reducers/auth.ts", AuthReducerSource);

  console.log("Redux installed successfully!");
}

const storeFileSource = `
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

`;

const AuthReducerSource = `
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  createdAt: string;
  avatar: {
    publicId : string;
    url : string
  }
}
interface AuthSlice {
  userStatus: boolean;
  userData: UserInterface | null;
}

const initialState: AuthSlice = {
  userStatus: false,
  userData: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action : PayloadAction<{user : UserInterface}>) => {
      state.userStatus = true;
      state.userData = action.payload.user;
    },
    logout: (state) => {
      state.userStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;

`;
