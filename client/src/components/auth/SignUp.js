import React, { useState } from 'react'
// import { signUp } from "../../actions/authActions"

const SignUp = () => {

    const [user, setUser] = useState({
        username: "",
        password: "",
        password2: ""
    })

    const { username, password, password2 } = user

    const onChange = e => setUser({
        ...user, [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        console.log('submit')
        e.preventDefault();
        // signUp({
        //     username,
        //     password
          
        // })
    }
    
    return (

        <div className="container account center-align">
            <h5>Don't have an account yet?</h5>
            <p>Registration is simple. No email required. <br />Just username and password needed</p>
            <ul className="collapsible z-depth-0">
                <li>
                    <div className="collapsible-header">Create your account here!</div>
                    <form className="collapsible-body" onSubmit={onSubmit}>
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
                        <div className="input-field">
                            <input
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                className="validate"
                                value={password2}
                                onChange={onChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Register"
                            className="btn z-depth-0" />
                    </form>
                </li>
            </ul>
        </div>
    )
}

export default SignUp
