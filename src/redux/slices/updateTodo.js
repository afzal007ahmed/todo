import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateTodo = createAsyncThunk('updateTodo' , async( body ) => {
    try{
        const response = await axios.put(`https://todo-api-iyvn.onrender.com/update/todo` , {
            title : body.title ,
            description : body.description ,
            id : body.id , 
            userId : body.userId
        }) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const updateTodoSlice = createSlice({
    name : 'updateTodoSlice' ,
    initialState : {
        success : null ,
        error : null ,
        loading : false 
    } ,
    reducers: { 
      clearStateUpdateTodo: ( state ) => {
          state.success = null ;
          state.error = null ;
          state.loading = false ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( updateTodo.fulfilled , ( state , action ) => {
             state.success = action.payload.success;
             state.error = action.payload.error ;
             state.loading = false ;
        }) ;
        builder.addCase( updateTodo.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
             state.loading = false ;
        })
                builder.addCase( updateTodo.pending , ( state , action ) => {
                 state.loading = true ;
                })
    }
})


export const { clearStateUpdateTodo } = updateTodoSlice.actions ;
export default updateTodoSlice.reducer ; 
