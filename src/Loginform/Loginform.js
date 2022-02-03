import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { useEffect } from "react/cjs/react.development";

const Loginform = ({register, registerWithGoogle, formState}) => {

    const [requestState, handleRequestSubmit] = useForm("mrgjplnv");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    if(requestState.succeeded){
        return(
            <h3>Your request was successfully submitted.  Please wait patiently until we get back to you one day.</h3>
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
        e.preventDefault()
        if(formState==="request"){

        } else {
            register(email,password);
            setEmail("");
            setPassword("");
            setMessage("");
        }
    }

    const placeholder = formState === "request" ? "Type your message here." : "At least 6 characters";
    const type = formState === "request" ? "text" : "password";
    const label = formState === "request" ? "Message:" : "Password:";
    const name = formState === "request" ? "message" : "password";
    const value = formState === "request" ? message : password;
    const submit = formState === "request" ? handleRequestSubmit : handleSubmit;

    return(
        <div>
            <form onSubmit={submit}>
                <label>Email:
                    <input type={"email"} name={"email"} value={email} onChange={handleChange} placeholder="sample@sample.com"></input>
                </label>
                <label>{label}
                    <input type={type} name={name} value={value} onChange={handleChange} placeholder={placeholder}></input>
                </label>
                <input type={"submit"} value="submit"></input>
            </form>
            {formState === "request" ? null: <button onClick={registerWithGoogle}>{formState} With Google</button>}
        </div>
    )
}

export default Loginform;