import React, { Fragment } from 'react'
import logo from "../../images/logo.png"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <Fragment>
            <div className="landing">
                <div className="landing-title center">
                    <img src={logo} alt="logo_image" />
                    <h3 className="white-text">Your Personal Job Application Logbook</h3>
                    <div>
                        <Link to="/account" className="btn">
                            <span><i className="far fa-user"></i></span>
                            <span>{" "}</span>
                            SIGN IN / MY ACCOUNT</Link>
                        {/* <a href="#!" className="btn">SignUp</a> */}
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Landing
