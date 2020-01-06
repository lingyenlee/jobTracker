import React, { Fragment ,useEffect} from 'react'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import M from "materialize-css/dist/js/materialize.min.js"

const Account = () => {

  useEffect(() => {
    //initialize materialize JS
    M.AutoInit()
  })

    return (
        <Fragment>
            <h5 className="account-heading grey lighten-4 grey-text text-darken-1 center-align">
                LOGIN/REGISTER
            </h5>
            <div className="row">
                <div className="col s12 m6 l6">
                    <SignIn />
                </div>
                <div className="col s12 m6 l6">
                    <SignUp/>
                </div>
            </div>
        </Fragment>

    )
}

export default Account
