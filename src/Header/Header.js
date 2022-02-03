import logo from './lomdei_logo.png';
import './Header.css';
import { getAuth, signOut } from "firebase/auth";
import { useContext } from 'react';
import { LoginStateContext } from '../App';
import { useEffect } from 'react/cjs/react.development';

const Header = () => {
    const {user} = useContext(LoginStateContext);

    const auth = getAuth();
    useEffect(()=>{
        if(user){
            console.log(user)
        } 
    },[user])
    
    const logOut = () => {
        signOut(auth)
            .then(()=>{
                // console.log("signed out");
                // loggedin status - false
            })
            .catch(error => console.log(error))
    }
    return(
        <header>
            <img src={logo} alt="Lomdei logo"></img>
            <div>
                <h3>Lomdei.com Administrator Console</h3>
            </div>
            {user ? 
                <div>
                    <h4>Welcome, {user.email}!</h4>
                    <button onClick={logOut}>Log out</button>
                </div>
                : null}
        </header>
        )
}

export default Header;