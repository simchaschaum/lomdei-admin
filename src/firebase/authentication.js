import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
        const user = userCredential.user;
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Sorry! We don't recognize your email or password. Please try again, click 'Forgot My Password,' or register.")
    })
}

export const register = async (email,password) => {
    const usersRaw = await getDocs(collection(db,"users"));
    const authorizedEmails = [];
    usersRaw.forEach(doc => authorizedEmails.push(doc.data().email));    
    if(authorizedEmails.includes(email)){
        createUserWithEmailAndPassword(auth,email, password)
        .then(userInfo => {
            console.log(userInfo);
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

export const loginWithGoogle = async () => {
    const usersRaw = await getDocs(collection(db,"users"));
    const authorizedEmails = [];
    usersRaw.forEach(doc => authorizedEmails.push(doc.data().email));  

    signInWithPopup(auth, googleProvider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(!authorizedEmails.includes(user.email)){
            signOut(auth)
                .then(()=>{
            // console.log("signed out");
            // loggedin status - false
            })
            .catch(error => console.log(error));
            alert(`Sorry! You are an unauthorized user.`)
        }
        // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
}

export const logOut = () => {
    signOut(auth)
        .then(()=>{
            // console.log("signed out");
            // loggedin status - false
        })
        .catch(error => console.log(error))
}