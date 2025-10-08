import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate } from "react-router-dom";


const Form = () => {

    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null);

    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(email, password)
        
        setErrorMsg(null);
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
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/login`, requestOptions)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.msg || "Login failed due to an unknown error.");
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
                console.error("Login failed:", error.message);
                setErrorMsg(error.message);
            });
    }

    return (
        <>
            {store.auth ? <Navigate to='/demo' /> : (
                <form className="w-50 mx-auto" onSubmit={sendData}>
                    {errorMsg && (
                        <div className="alert alert-danger mb-3" role="alert">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                        />
                    </div>
                    <div className="d-flex align-content-around">
                        <div className="col-6">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="col-6">
                            <Link to="/signup">
                                <button className="btn btn-warning">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}


export default Form 