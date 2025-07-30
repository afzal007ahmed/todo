import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getATodo = createAsyncThunk('getATodo' , async( body ) => {
    try{
        const response = await axios.get(`https://todo-api-iyvn.onrender.com/todo/${body.id}/${body.userId}`) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const getATodoSlice = createSlice({
    name : 'getATodoSlice' ,
    initialState : {
        data : null ,
        error : null ,
        loading : false 
    } ,
    reducers: { 
      clearStateGetATodo : ( state ) => {
          state.data = null ;
          state.error = null ;
          state.loading = false ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( getATodo.fulfilled , ( state , action ) => {
             state.data = action.payload.data;
             state.error = action.payload.error ;
             state.loading = false ;
        }) ;
        builder.addCase( getATodo.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
             state.loading = false ;
        })
                builder.addCase( getATodo.pending , ( state , action ) => {
             state.loading = true ;
        })
    }
})


export const { clearStateGetATodo } = getATodoSlice.actions ;
export default getATodoSlice.reducer ; 
