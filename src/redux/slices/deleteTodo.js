import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTodo = createAsyncThunk('deleteTodo' , async( body ) => {
    try{
        const response = await axios.delete(`https://todo-api-iyvn.onrender.com/delete/${body.id}/${body.userId}`) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const deleteTodoSlice = createSlice({
    name : 'deleteTodoSlice' ,
    initialState : {
        success : null ,
        error : null ,
        loading : false 
    } ,
    reducers: { 
      clearStateDeleteTodo : ( state ) => {
          state.success = null ;
          state.error = null ;
          state.loading = false ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( deleteTodo.fulfilled , ( state , action ) => {
             state.success = action.payload.success;
             state.error = action.payload.error ;
             state.loading = false ;
        }) ;
        builder.addCase( deleteTodo.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
             state.loading = false ;
        })
                builder.addCase( deleteTodo.pending , ( state , action ) => {
             state.loading = true ;
        })
    }
})


export const { clearStateDeleteTodo } = deleteTodoSlice.actions ;
export default deleteTodoSlice.reducer ; 
