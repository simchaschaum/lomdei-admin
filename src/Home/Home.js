import { NavLink } from "react-router-dom";
import Loginform from "../Loginform/Loginform";
import "./home.css"

const Home = () => {

    return(
    <div id="home">
        <h1>Welcome to the Administrator Console for www.lomdei.com!</h1>
        <h4>Please log in.</h4>
        <Loginform formState={"Log in"}/>
        <NavLink to='./register'><h4>New User? Please Register</h4></NavLink>
    </div>
    )
}

export default Home;