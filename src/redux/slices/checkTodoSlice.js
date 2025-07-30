import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkTodo = createAsyncThunk('checkTodo' , async( body ) => {
    try{
        const response = await axios.get(`https://todo-api-iyvn.onrender.com/check/${body.id}/${body.userId}`) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const checkTodoSlice = createSlice({
    name : 'checkTodoSlice' ,
    initialState : {
        success : null ,
        error : null ,
    } ,
    reducers: { 
      clearStateCheckTodo: ( state ) => {
          state.success = null ;
          state.error = null ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( checkTodo.fulfilled , ( state , action ) => {
             state.success = action.payload.success;
             state.error = action.payload.error ;
        }) ;
        builder.addCase( checkTodo.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
        })
    }
})


export const { clearStateCheckTodo } = checkTodoSlice.actions ;
export default checkTodoSlice.reducer ; 
