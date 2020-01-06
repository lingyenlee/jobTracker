import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR
} from "./../actions/types"

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    // error: null,
    loading: true
}

export default (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case USER_LOADED:
            console.log("userloaded", action.payload)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            console.log("login success", action.payload)
            console.log("login success token", action.payload.token)
            return {
                ...state,
                //include entire payload (user+token)
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case REGISTER_FAIL:
            localStorage.removeItem("token")
            // console.log("login fail", action.payload)
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }

}