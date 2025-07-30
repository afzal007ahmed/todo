import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTodo = createAsyncThunk('checkEmail' , async( body ) => {
    try{
        const response = await axios.post(`https://todo-api-iyvn.onrender.com/add/todo`, {
            title : body.title ,
            description : body.description ,
            userId : body.userId
        }) ;
        return response.data ;
    }
    catch( err ){
         throw new Error( err.message ) ;
    }
});

const addTodoSlice = createSlice({
    name : 'addTodoSlice' ,
    initialState : {
        success : null ,
        error : null ,
        loading : false 
    } ,
    reducers: { 
      clearStateAddTodo : ( state ) => {
          state.success = null ;
          state.error = null ;
          state.loading = false ;
      }
    },
    extraReducers : ( builder ) => {
        builder.addCase( addTodo.fulfilled , ( state , action ) => {
             state.success = action.payload.success;
             state.error = action.payload.error ;
             state.loading = false ;
        }) ;
        builder.addCase( addTodo.rejected , ( state , action ) => {
             state.error = action.error.message || action.payload.error ;
             state.loading = false ;
        })
                builder.addCase( addTodo.pending , ( state , action ) => {
             state.loading = true ;
        })
    }
})


export const { clearStateAddTodo } = addTodoSlice.actions ;
export default addTodoSlice.reducer ; 
