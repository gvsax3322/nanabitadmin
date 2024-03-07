import { createSlice } from "@reduxjs/toolkit";

// API 서버 연동
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/login/loginApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { LoginParam, LoginRes } from "../pages/admin/login/LoginPage";

export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async ({
    loginParam,
    successFn,
    failFn,
    errorFn,
  }: {
    loginParam: LoginParam;
    successFn: (data: LoginRes) => void;
    failFn: (error: string) => void;
    errorFn: (error: string) => void;
  }) => {
    try {
      const res = await loginPost({ loginParam, successFn, failFn, errorFn });

      return res;
    } catch (error) {
      return error;
    }
  },
);

const initState = {
  nm: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("nm");
  return memberInfo || initState;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie(),
  reducers: {
    login: (state, action) => {
      // //console.log("login.....");
      setCookie("nm", JSON.stringify(action.payload || {}));
      return { nm: action.payload?.nm || "" };
    },
    logout: (state, action) => {
      // //console.log("logout.....");
      removeCookie("nm", "/");
      return { ...initState };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // //console.log("fulfilled");
        const payload = action.payload || {};
        if (!payload.error) {
          setCookie("nm", JSON.stringify(payload));
          return { nm: payload.nm || "" };
        } else {
          return state;
        }
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // //console.log("pending");
        return state;
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // //console.log("rejected");
        return state;
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
