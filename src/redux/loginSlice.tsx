import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { loginPost } from "../api/loginApi";
import { LoginFunctions } from "../pages/hooks/useCustomLogin";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

interface MemberInfo {
  nm: string;
}

export interface RootState {
  loginSlice: MemberInfo;
}
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async ({
    loginParam,
    successFn,
    failFn,
    errorFn,
  }: LoginFunctions) => {
    try {
      const res = await loginPost({ loginParam, successFn, failFn, errorFn });
      return res;
    } catch (error) {
      throw error;
    }
  },
);

const initState: MemberInfo = {
  nm: "",
};

const loadMemberCookie = (): MemberInfo => {
  const memberInfo = getCookie("nm");
  return memberInfo || initState;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie(),
  reducers: {
    login: (state, action: PayloadAction<MemberInfo>) => {
      setCookie("nm", JSON.stringify(action.payload || {}));
      return { nm: action.payload?.nm || "" };
    },
    logout: () => {
      removeCookie("nm", "/");
      return { ...initState };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (!payload.error) {
          setCookie("nm", JSON.stringify(payload));
          return { nm: payload.nm || "" };
        } else {
          return state;
        }
      })
      .addCase(loginPostAsync.pending, state => state)
      .addCase(loginPostAsync.rejected, state => state);
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
