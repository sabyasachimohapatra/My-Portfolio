import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const forgotRestPassSlice = createSlice({
    name:"forgotPassword",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        forgotPasswordRequest(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        forgotPasswordSuccess(state,action){
            state.loading=false;
            state.error=null;
            state.message=action.payload;
        },
        forgotPasswordFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },

        resetPasswordRequest(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        resetPasswordSuccess(state,action){
            state.loading=false;
            state.error=null;
            state.message=action.payload;
        },
        resetPasswordFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },

        clearAllErrors(state,action){
            state.error=null;
            state=state;
        }

    }
})




export const forgotPassword =(email) => async(dispatch)=>{
     dispatch(forgotRestPassSlice.actions.forgotPasswordRequest());
    try {
        const {data} = await axios.post("https://my-portfolio-backend-u1um.onrender.com/api/v1/user/password/forgot",
                                        {email},
                                        {withCredentials:true, headers:{"Content-Type":"application/json"}}
                );
        dispatch(forgotRestPassSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(forgotRestPassSlice.actions.clearAllErrors());
        
        
    } catch (error) {
        dispatch(forgotRestPassSlice.actions.forgotPasswordFailed(error.response.data.message));
    }
}

export const resetPassword =(token,password,confirmPassword) => async(dispatch)=>{
    dispatch(forgotRestPassSlice.actions.resetPasswordRequest());
    try {
        const {data} = await axios.put(`https://my-portfolio-backend-u1um.onrender.com/api/v1/user/password/reset/${token}`,
                                        {password,confirmPassword},
                                        {withCredentials:true, headers:{"Content-Type":"application/json"}}
                );
        dispatch(forgotRestPassSlice.actions.resetPasswordSuccess(data.message));
        dispatch(forgotRestPassSlice.actions.clearAllErrors());
        
        
    } catch (error) {
        dispatch(forgotRestPassSlice.actions.resetPasswordFailed(error.response.data.message));
    }
}

export const clearAllForgotResetPassErrors = ()=>(dispatch)=>{
    dispatch(forgotRestPassSlice.actions.clearAllErrors());
}
export default forgotRestPassSlice.reducer;