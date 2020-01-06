import React, { useState, useEffect } from 'react'
import { login } from "../../actions/authActions"
import { connect } from "react-redux"

const SignIn = (props) => {

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/jobs');
        }


        // eslint-disable-next-line
    }, [props.auth.isAuthenticated, props.history]);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const { username, password } = user

    const onChange = e => setUser({
        ...user, [e.target.name]: e.target.value
    })


    const onSubmit = e => {
        e.preventDefault();
        props.login(user)



    }
    console.log(props)
    console.log(props.auth)
    return (
        <div className="container account">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input
                        placeholder="Username"
                        name="username"
                        type="text"
                        className="validate"
                        value={username}
                        onChange={onChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="validate"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="btn z-depth-0" />
            </form>
        </div>
    )

}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         login: (creds) => dispatch(login(creds))
//     }
// }

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { login })(SignIn)
