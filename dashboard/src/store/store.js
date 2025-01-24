import { configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./slices/userSlice.js"
import  forgotResetPasswordReducer  from "./slices/forgotResetPasswordSlice.js"

export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:forgotResetPasswordReducer,
    }
})
