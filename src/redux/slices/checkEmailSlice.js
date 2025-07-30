import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkEmail = createAsyncThunk('checkEmail' , async( email ) => {
    try{
        const response = await axios.get(`https://todo-api-iyvn.onrender.com/check/email/${email}`) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const checkEmailSlice = createSlice({
    name : 'checkEmailSlice' ,
    initialState : {
        exists : null ,
        error : null 
    } ,
    reducers: { 
      clearStateCheckEmail : ( state ) => {
          state.exists = null ;
          state.error = null ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( checkEmail.fulfilled , ( state , action ) => {
             state.exists = action.payload.exists;
             state.error = action.payload.error ;
        }) ;
        builder.addCase( checkEmail.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
        })
    }
})


export const { clearStateCheckEmail } = checkEmailSlice.actions ;
export default checkEmailSlice.reducer ; 
