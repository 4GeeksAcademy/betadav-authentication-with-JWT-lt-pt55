import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate } from "react-router-dom";

export const SignUp = () => {
    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null);

    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(email, password)

        // Clear any previous error message on submission attempt
        setErrorMsg(null);

        // Basic client-side validation for empty fields (optional, but good practice)
        if (!email || !password) {
            setErrorMsg("Email and password are required.");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        };
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/signup`, requestOptions)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.msg || "An unknown error occurred during signup.");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("token", data.access_token);
                dispatch({ type: "set_auth", payload: true });
            })
            .catch(error => {
                setErrorMsg(error.message);
            });

    }

    return (
        <div className="container text-center mt-5">
            <>
                {store.auth ? <Navigate to='/demo' />
                    :
                    <>
                        <h1>Register here</h1>

                        {errorMsg && (
                            <div className="alert alert-danger w-50 mx-auto" role="alert">
                                {errorMsg}
                            </div>
                        )}

                        <form className="w-50 mx-auto" onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex justify-content-around">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <Link to="/">
                                    <button className="btn btn-success">Log In</button>
                                </Link>
                            </div>

                        </form>
                    </>
                }
            </>
        </div>
    );
}