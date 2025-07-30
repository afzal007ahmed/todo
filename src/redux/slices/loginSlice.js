import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('login' , async( body )  => {
    try{
        const response = await axios.post('https://todo-api-iyvn.onrender.com/login' , {
         email : body.email ,
         password : body.password
        });
        
        if( response.data.error ) {
            throw new Error( response.data.error ) ;
        }
        return response.data;
    }
    catch( err ){
        throw new Error( err.message ) ;
    }
});



const loginSlice = createSlice({
    name : 'loginSlice' ,
    initialState : {
        exists : null ,
        error : null ,
        userId : null ,
        loading : false ,
        name : null
    },
    extraReducers : ( builder ) => {
        builder.addCase(login.pending , ( state ) => {
            state.loading = true ;
            state.error = null ;
            state.exists = null ;
            state.name = null ;
        } );
        builder.addCase(login.fulfilled , ( state , action ) => {
            state.loading = false ;
            state.exists = action.payload.exists ;
            state.error = action.payload.error ;
            state.userId = action.payload.userId ;
            state.name = action.payload.name ;
        } );
        builder.addCase(login.rejected , ( state , action ) => {
            state.loading = false ;
            state.error = action.error.message || action.payload.error ;
        } );
    }
});

export default loginSlice.reducer ;