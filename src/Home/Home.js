import { NavLink } from "react-router-dom";
import Loginform from "../Loginform/Loginform";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { LoginStateContext } from "../App";


const Home = () => {

    const auth = getAuth();
    const {loggedIn, user} = useContext(LoginStateContext);

    const register = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }

    return(
    <div id="home">
        <h1>Welcome to the Administrator Console for www.lomdei.com!</h1>
        <h4>Please log in.</h4>
        <Loginform register={register} formState={"Log in"}/>
        <NavLink to='./register'><h4>New User? Please Register</h4></NavLink>
    </div>
    )
}

export default Home;