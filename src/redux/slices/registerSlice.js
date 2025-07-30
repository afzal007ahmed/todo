import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk('register' , async( body )  => {
    try{
        const response = await axios.post('https://todo-api-iyvn.onrender.com/register' , {
         name : body.name ,
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



const registerSlice = createSlice({
    name : 'registerSlice' ,
    initialState : {
        success : null ,
        error : null ,
        loading : false 
    },
    reducers : {
       clearStateRegister : ( state ) => {
        state.loading = false ;
        state.error = null ;
        state.success = null ;
       }
    },
    extraReducers : ( builder ) => {
        builder.addCase(register.pending , ( state ) => {
            state.loading = true ;
        } );
        builder.addCase(register.fulfilled , ( state , action ) => {
            state.loading = false ;
            state.success = action.payload.success ;
            state.error = action.payload.error ;
        } );
        builder.addCase(register.rejected , ( state , action ) => {
            state.loading = false ;
            state.error = action.error.message || action.payload.error ;
        } );
    }
});

export const { clearStateRegister } = registerSlice.actions ;
export default registerSlice.reducer ;