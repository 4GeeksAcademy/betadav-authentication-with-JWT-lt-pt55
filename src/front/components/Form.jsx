import React, { useState } from "react";

const Form = () =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(email, password)
    }

    return (
        <form className="w-50 mx-auto">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" onClick={sendData} class="btn btn-primary">Submit</button>
        </form>
    );
}


export default Form 