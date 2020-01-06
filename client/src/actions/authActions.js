import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, LOGOUT, USER_LOADED } from "./types"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"

//load a user after login success
export const loadUser = () => async dispatch => {
    console.log("loaduser")
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get("/api/auth");

        dispatch({

            type: USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })

    }

}


//login a user - get token
export const login = (formData) => async dispatch => {

    // const config = {
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }

    try {
        const res = await axios.post("/api/auth", formData)
        console.log("Res", res)
        //    console.log("action formdata", formData)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data

        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg
        })

    }

}

// const config = {
//     headers: {
//         "Content-Type": "application/json"
//     }
// }
// try {
//     const res = await axios.post("/api/users", { username, password }, config)
//     console.log("Action")
//     dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data
//     })
// } catch (error) {

//     dispatch({
//         type: REGISTER_FAIL,
//         payload: error.response.statusText
//     })
// }