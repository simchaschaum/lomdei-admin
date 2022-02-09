import Loginform from "../Loginform/Loginform";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';

const Register = ()=>{

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const register = async (email,password) => {
        const usersRaw = await getDocs(collection(db,"users"));
        const authorizedEmails = [];
        usersRaw.forEach(doc => authorizedEmails.push(doc.data().email));    
        if(authorizedEmails.includes(email)){
            createUserWithEmailAndPassword(auth,email, password)
            .then(userInfo => {
                console.log(userInfo);
                navigate('/');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                alert("Sorry! Registration didn't work.  Please try again.")
            })    
        } else {
            alert("Whoops! Looks like you are not an authorized user yet.  Please fill out the request form below.")
        }
            }

    const registerWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert("Sorry! Registration didn't work.  Please try again.")
                // ...
            });
    }
  

    return(
        <div>
            <h1>Welcome to the Administrator Console for www.lomdei.com!</h1>
            <h4>If you are not yet authorized, please fill out this request form:</h4>
            <Loginform formState={"request"}/>
            <h4>If you are already authorized, please register below:</h4>
            <Loginform register={register} registerWithGoogle={registerWithGoogle} formState={"register"}/>
            <NavLink to='/'><h4>Already registered? Please log in.</h4></NavLink>
        </div>
    )
}

export default Register;