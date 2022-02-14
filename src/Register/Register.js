import Loginform from "../Loginform/Loginform";
import { NavLink } from "react-router-dom";

const Register = ()=>{

     return(
        <div>
            <h1>Welcome to the Administrator Console for www.lomdei.com!</h1>
            <h4>If you are not yet authorized, please fill out this request form:</h4>
            <Loginform formState={"Request"}/>
            <h4>If you are already authorized, please register below:</h4>
            <Loginform formState={"Register"}/>
            <NavLink to='/'><h4>Already registered? Please log in.</h4></NavLink>
        </div>
    )
}

export default Register;