import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk('getAllTodos' , async( id ) => {
    try{
        const response = await axios.get(`https://todo-api-iyvn.onrender.com/alltodos/${id}`) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const getAllTodosSlice = createSlice({
    name : 'getAllTodosSlice' ,
    initialState : {
        data : null ,
        error : null ,
        loading : false 
    } ,
    reducers: { 
      clearStateGetAllTodos : ( state ) => {
          state.data = null ;
          state.error = null ;
          state.loading = false ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( getAllTodos.fulfilled , ( state , action ) => {
             state.data = action.payload.data;
             state.error = action.payload.error ;
             state.loading = false ;
        }) ;
        builder.addCase( getAllTodos.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
             state.loading = false ;
        })
                builder.addCase( getAllTodos.pending , ( state , action ) => {
             state.loading = true ;
        })
    }
})


export const { clearStateGetAllTodos } = getAllTodosSlice.actions ;
export default getAllTodosSlice.reducer ; 
