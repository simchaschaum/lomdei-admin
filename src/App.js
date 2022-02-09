import { Routes, Route, useNavigate } from 'react-router-dom';
import {useEffect, useState, createContext} from 'react';
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register/Register';
import fbApp, {db} from './firebase/firebase';
import { getAuth, } from "firebase/auth";
import { collection, query, where, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const StateContext = createContext();

function App() {

  const navigate = useNavigate();

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
      fetchCategories();
    } else {
      navigate('/')
    }
  }, [user])

  const fetchCategories = async () => {
    let response = await getDocs(collection(db,"website-info"));
    let arr = [];
    response.forEach(item => arr.push(item.id))
    setCategories(arr);
  }
  

  return (
    <div className="App">
      <StateContext.Provider value={{user, categories}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </StateContext.Provider>
    </div>
  );
}

export default App;
