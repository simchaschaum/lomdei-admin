import logo from './lomdei_logo.png';
import './Header.css';
import { useContext } from 'react';
import { StateContext } from '../App';
import { logOut } from '../firebase/authentication';

const Header = () => {
    const {user} = useContext(StateContext);

    return(
        <header>
            <img src={logo} alt="Lomdei logo"></img>
            <div>
                <h3>Lomdei.com Administrator Console</h3>
            </div>
            {user ? 
                <div className='user'>
                    <h4>Welcome, {user.displayName ? user.displayName : user.email}!</h4>
                    <button onClick={logOut}>Log out</button>
                </div>
                : null}
        </header>
        )
}

export default Header;