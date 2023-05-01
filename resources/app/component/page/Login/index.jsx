import * as React from 'react';
import store from "../../../store";

import logo from '../../../static/login.svg'
import {useState} from "react";

export default function Login() {
    let username, password = null;
    const [error, setError] = useState(false);

    function doLogin(e) {
        e.preventDefault();
        store.dispatch.userState.doLogin({username, password}).then((isConnected) => {
                 setError(!isConnected);
            }
        );

    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={logo} className="img-fluid" alt="login image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={doLogin}>
                            {error && (<div className="alert alert-danger"> Username or Password are incorrect</div>)}
                            <div className="form-outline mb-4">
                                <input type="text"
                                       className="form-control form-control-lg"
                                       onChange={(e) => username = e.target.value}
                                />
                                <label className="form-label" htmlFor="form1Example13">Username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password"
                                       onChange={(e) => password = e.target.value}
                                       className="form-control form-control-lg"
                                />
                                <label className="form-label" htmlFor="form1Example23">Password</label>
                            </div>

                            <button
                                type="submit" className="btn btn-primary btn-lg btn-block">Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
