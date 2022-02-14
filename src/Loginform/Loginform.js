import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm, ValidationError } from '@formspree/react';
import "./loginform.css";
const Loginform = ({register, registerWithGoogle, formState}) => {

    const [requestState, handleRequestSubmit] = useForm("mrgjplnv");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(()=>console.log(requestState),[requestState])

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
    const handleSubmit = (e) => {
        e.preventDefault();
        register(email,password);
        setEmail("");
        setPassword("");
        setMessage("");
    }

    const placeholder = formState === "Request" ? "Type your message here." : "At least 6 characters";
    const type = formState === "Request" ? "text" : "password";
    const label = formState === "Request" ? "Message:" : "Password:";
    const name = formState === "Request" ? "Message" : "Massword";
    const value = formState === "Request" ? message : password;
    const submit = formState === "Request" ? handleRequestSubmit : handleSubmit;

    return(
        <div className="login-outer-div">
            <form className="login-form" onSubmit={submit}>
                <label>Email:
                    <input required type={"email"} name={"email"} value={email} onChange={handleChange} placeholder="sample@sample.com"></input>
                </label>
                <label>{label}
                    <input required type={type} name={name} value={value} onChange={handleChange} placeholder={placeholder}></input>
                </label>
                <input type={"submit"} readOnly value="Submit"></input>
            </form>
            {formState === "Request" ? null: <button onClick={registerWithGoogle}>{formState} With Google</button>}
        </div>
    )
}

export default Loginform;