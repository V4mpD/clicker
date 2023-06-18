import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IAuth {
  data: {
    email: string | null;
    localId: string | null;
    authToken: string | null;
  } | null;
  error: string | null;
  loading: boolean;
}

const initialState:IAuth = {
  data: {
    email:localStorage.getItem("@EMAIL") || null,
    localId:localStorage.getItem("@LOCAL_ID") || null,
    authToken:localStorage.getItem("@AUTH_TOKEN") || null,
  },
  error: null,
  loading: false,
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
        let payload : any;
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvka4E1PktqyqwqKmJgOsu-O2hnbidyMA",
        {
          email,
          password,
          returnSecureToken: true,
        })
        .then(res => payload = res.data)
        .catch(err => console.log(err.message));

        localStorage.setItem("@EMAIL",payload.email);
        localStorage.setItem("@LOCAL_ID",payload.localId);
        localStorage.setItem("@AUTH_TOKEN",payload.idToken);

        return payload;
    } catch(error:any){
        if (error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message);
        }else{
            return rejectWithValue(error.message)
        }
    }
  }
);

export const userLogin = createAsyncThunk(
    "auth/login",
    async (
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      },
      { rejectWithValue }
    ) => {
      try {
          let payload : any;
          await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvka4E1PktqyqwqKmJgOsu-O2hnbidyMA",
          {
            email,
            password,
            returnSecureToken: true,
          })
          .then(res => payload = res.data)
          .catch(err => console.log(err.message));
  
          localStorage.setItem("@EMAIL",payload.email);
          localStorage.setItem("@LOCAL_ID",payload.localId);
          localStorage.setItem("@AUTH_TOKEN",payload.idToken);
  
          return payload;
      } catch(error:any){
          if (error.response && error.response.data.message){
              return rejectWithValue(error.response.data.message);
          }else{
              return rejectWithValue(error.message)
          }
      }
    }
  );

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:{
        [`${userRegister.pending}`]:(state) => {
            state.loading = true;
        },
        [`${userRegister.fulfilled}`]:(state,{payload}) => {
            state.loading = false;
            state.data = {
                email:payload.email,
                localId:payload.localId,
                authToken:payload.authToken,
            }
        },
        [`${userRegister.rejected}`]:(state,{payload}) => {
            state.loading = false;
            state.error = payload;
        },
        [`${userLogin.pending}`]:(state) => {
            state.loading = true;
        },
        [`${userLogin.fulfilled}`]:(state,{payload}) => {
            state.loading = false;
            state.data = {
                email:payload.email,
                localId:payload.localId,
                authToken:payload.authToken,
            }
        },
        [`${userLogin.rejected}`]:(state,{payload}) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export default authSlice.reducer;




