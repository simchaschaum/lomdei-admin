import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm} from '@formspree/react';
import "./loginform.css";
import {login, register, loginWithGoogle} from '../firebase/authentication';

const Loginform = ({formState}) => {

    const [requestState, handleRequestSubmit] = useForm("mrgjplnv");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    if(requestState.succeeded){
        return(
            <div className="login-form">
                <h3 id="request-success-msg">Your request was successfully submitted.  We'll get back to you by email.</h3>
                <NavLink to={`/`}><button>Back to Home</button></NavLink>
            </div>
        )
    } else if(requestState.errors.length>0){
        return(
            <div className="login-form">
                <h3 id="request-success-msg">Error: {requestState.errors[0].message}</h3>
                <p>If this problem persists, please contact rabbischaum@lomdei.com.</p>
                <NavLink to={`/`}><button>Back to Home</button></NavLink>
            </div>
        )
    }
    
    const handleChange = (e) => {
        switch(e.target.name){
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default: 
                setMessage(e.target.value)
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();
        login(email,password);
        clear()
    }
    const handleRegister = (e) => {
        e.preventDefault();
        register(email,password);
        clear()
    }

    const clear = () => {
        setEmail("");
        setPassword("");
        setMessage("");
    }

    const btnControl = {
        "Request": {
            placeholder: "Type your message here.",
            type: "text",
            label: "Message",
            name: "message",
            value: message,
            submit: handleRequestSubmit
        },
        "Log in": {
            placeholder: "At least 6 characters",
            type: "password",
            label: "Password",
            name: "password",
            value: password,
            submit: handleLogin,
            google: loginWithGoogle
        },
        "Register": {
            placeholder: "At least 6 characters",
            type: password,
            label: "Password",
            name: "password",
            value: password,
            submit: handleRegister,
            google: loginWithGoogle
        }
    }
       
    return(
        <div className="login-outer-div">
            <form className="login-form" onSubmit={btnControl[formState].submit}>
                <label>Email:
                    <input required type={"email"} name={"email"} value={email} onChange={handleChange} placeholder="sample@sample.com"></input>
                </label>
                <label>{btnControl[formState].label}
                    <input required type={btnControl[formState].type} name={btnControl[formState].name} value={btnControl[formState].value} onChange={handleChange} placeholder={btnControl[formState].placeholder}></input>
                </label>
                <input type={"submit"} readOnly value="Submit"></input>
            </form>
            {formState !== "Request" && <button className="login-btn" onClick={btnControl[formState].google}>{formState} With Google</button>}
        </div>
    )
}

export default Loginform;