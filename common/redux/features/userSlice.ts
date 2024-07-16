"use client"

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Signin } from "src/modules/user/controllers/auth";
import { updateUser } from "src/modules/user/controllers/user";

interface DataInfo {
  // 사용자 정보에 해당하는 인터페이스를 정의합니다.
  code :string
  element : string
  message : string
  userInfo : {
    id:number;
    uuid: string;
    nickname: string;
    password: string;
    email: string;
    createdAt: string;
    updateAt: string;
  }
}

interface UserState {
  userInfo: DataInfo | null;
  loading: boolean,
  error: string | undefined,
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: undefined,
};

interface FetchSignInPayload {
  formData: FormData;
}

interface FetchUserInfoPayload {
  accessToken: string;
  formData: FormData;
}

interface FetchSignInResponse {
  userInfo: DataInfo;
  accessToken: string;
}

export const fetchSignIn = createAsyncThunk<FetchSignInResponse, FetchSignInPayload>(
  'userInfo/fetchSignIn',
  async ({formData}: { formData: FormData }):Promise<{ userInfo: DataInfo; accessToken: string }> => {
    let result;
    await Signin(formData).then((response) => {
      console.log(response)
      result = response
    })
    return { userInfo: result.data, accessToken: result.accessToken };
    // const response = await fetch('/auth/api/signin', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await response.json();
    // return data.data.userInfo;
    
  }
);

export const fetchUserInfo = createAsyncThunk<DataInfo, FetchUserInfoPayload>(
  'userInfo/fetchUserInfo',
  async ({accessToken, formData}: { accessToken: string, formData: FormData }):Promise<DataInfo> => {

    let result;
    const params = {
      accessToken: accessToken,
      nickname: formData.get('nickname') as string
    }
    await updateUser(params).then((response) => {
      console.log(response)
      result = response
    })
    return result.data;
    // const response = await fetch('/user/api/handler', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   method: 'PUT',
    //   body: formData,
    // });
    // const result = await response.json();
    // return result.data;
  }
);

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // setUserInfo: (state, action: PayloadAction<UserInfo>) => {
    //   console.log(action.payload)
    //   state.userInfo = action.payload;
    // },
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        if(action.payload.code !== 'error') {
          if(action.payload) state.userInfo = action.payload;
        }
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.loading = false;
        // 사용자 정보와 accessToken 받아오기
        const { userInfo, accessToken } = action.payload;
        // fetchSignIn에서 받아온 사용자 정보로 덮어쓰기
        state.userInfo = userInfo;
        // localStorage에 accessToken 저장
        localStorage.setItem('accessToken', accessToken);
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
})

export const { resetUserInfo } = userSlice.actions;
export default userSlice.reducer;