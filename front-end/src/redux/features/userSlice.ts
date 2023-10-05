import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';
import { fetchLogin, fetchMyInfo, fetchRegister, fetchVerifyOTP } from '../../api/auth';
import jwt_decode from "jwt-decode";
import { fetchUserById, updateUser } from '../../api/userApi';
import { user } from '../../constants/types';
export interface userSliceType {
  users: user[],
  user: {},
  myUser: {},
  accessToken: string | undefined,
  isLogged: Boolean | null,
  isLoading: Boolean,
  isLoadingCreate: Boolean,
  isSuccessOTP: Boolean,
  isValidRegister: Boolean,
}

const isLoggedFromLocalStorage = localStorage.getItem("is_logged");
const initialIsLogged = isLoggedFromLocalStorage ? JSON.parse(isLoggedFromLocalStorage) : false;

const initialState: userSliceType = {
  users: [],
  user: {},
  myUser: {},
  accessToken: localStorage.getItem("token") ||"",
  isLogged: initialIsLogged,
  isLoading: false,
  isLoadingCreate: false,
  // Dùng để check đóng popup OTP khi đăng ký thành công
  isSuccessOTP: false,
  isValidRegister: false,
}

// act Login 
export const actFetchLogin = createAsyncThunk(
  "users/actFetchLogin",
  async (user: {email:string, password: string}) => {
    const userData = await fetchLogin(user);
    return userData;
  }
);

// act Get user by id
export const actGetUserById = createAsyncThunk("users/actGetUserById", async(idUser:number) => {
  const data = await fetchUserById(idUser)
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actGetMyInfo: (state, action) => {
      state.myUser = action.payload      
    },
    actUpdateInFoUser: (state, action) => {
      state.user = action.payload
    },
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
    actUpdateIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    actUpdateSuccessOTP: (state, action) => {
      state.isSuccessOTP = action.payload
    },
    actUpdateIsValidRegister: (state, action) => {
      state.isValidRegister = action.payload
    },
    actLogout: (state) => {
      localStorage.removeItem('token');
      localStorage.setItem('is_logged', JSON.stringify(false));
      state.isLogged = false;
      state.myUser = {};
      state.accessToken = "";
    }, 
  },
  extraReducers(builder) {
    // Thunk login
    builder.addCase(actFetchLogin.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(actFetchLogin.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(actFetchLogin.fulfilled, (state, action) => {
      state.isLoading = false
      if(action.payload?.data.token) {
        state.myUser = action.payload?.data.data      
        state.accessToken = action.payload?.data.token
        state.isLogged = true
        localStorage.setItem('token', JSON.stringify(action.payload?.data.token))
        localStorage.setItem('is_logged', JSON.stringify(true));
      }
    });
    // get User by Id
    builder.addCase(actGetUserById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(actGetUserById.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(actGetUserById.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload?.data.data || {}
    })
  },
})

// Register
export const actRegister = (user: { name: string; email: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    dispatch(actUpdateIsLoading(true));
    fetchRegister(user).then((res) => {
      if(res) {
        dispatch(actUpdateIsValidRegister(true))
      }else {
        dispatch(actUpdateIsValidRegister(false))
      }
    })
  } catch (error) {
    console.log(error);
    dispatch(actUpdateIsLoading(false));
  } finally {
    dispatch(actUpdateIsLoading(false));
  }
};

// VerifyOTP
export const actVerityOTP = (payload: { name: string; email: string; password: string, otp:string }) => async (dispatch: Dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    fetchVerifyOTP(payload).then((res) => {
      if(res) {
        dispatch(actUpdateSuccessOTP(true))
      }else {
        dispatch(actUpdateSuccessOTP(false))
      }

    })
  } catch (error) {
    console.log(error);
    dispatch(actUpdateLoadingCreate(false));
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

// Login
export const actReLogin = (token:string) => async (dispatch: Dispatch) => {
  try {
    const decoded:any =  await jwt_decode(token)
    if(decoded?.id) {
      fetchMyInfo(decoded.id).then((res) => {
        dispatch(actGetMyInfo(res?.data.data))
      })
    }
  } catch (error) {
    console.log(error);
    dispatch(actUpdateLoadingCreate(false));
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
}

//Update profile
export const actUpdateUser = (idUser:number, payload:object, token:string) => async(dispatch: Dispatch) => {
  try {
    dispatch(actUpdateIsLoading(true))
    await updateUser(idUser, payload, token)
    dispatch(actGetUserById(idUser))
    dispatch(actReLogin(token))
  } catch (error) {
    dispatch(actUpdateIsLoading(false))
  } finally {
    dispatch(actUpdateIsLoading(false))
  }
}
export const {
  actGetMyInfo,
  actLogout,
  actUpdateLoadingCreate,
  actUpdateIsLoading,
  actUpdateSuccessOTP,
  actUpdateIsValidRegister,
  actUpdateInFoUser
} = userSlice.actions;
export default userSlice.reducer;