import { Routes, Route, useNavigate } from 'react-router-dom';
import {useEffect, useState, createContext} from 'react';
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register/Register';
import fbApp from './firebase/firebase';
import { getAuth, } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const LoginStateContext = createContext();

function App() {

  const navigate = useNavigate();

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    } else {
      navigate('/')
    }
  }, [user])

  return (
    <div className="App">
      <LoginStateContext.Provider value={{user}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </LoginStateContext.Provider>
    </div>
  );
}

export default App;
