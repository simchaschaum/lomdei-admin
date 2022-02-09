import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";
import './dashboard.css';

const Dashboard = ()=> {

    const [category, setCategory] = useState("Choose Category");
    const [contentArr, setContentArr] = useState([]);
    const [timeStamp, setTimeStamp] = useState("");
    const [editor, setEditor] = useState("");

    const {user, categories} = useContext(StateContext);

    useEffect(()=>console.log(contentArr),[contentArr]);
    useEffect(()=>console.log(timeStamp),[timeStamp]);
    useEffect(()=>console.log(editor),[editor])



    const setTheCategory = (e)=>{
        e.preventDefault();
        setCategory(e.target.value);
    }
    const getText = async (e) => {
        e.preventDefault();
        const response = await getDoc(doc(db,"website-info",category));
        let obj = response.data();
        setContentArr(obj.content);
        setEditor(obj["last editor"]);
        let date = new Date(obj.timeStamp.seconds*1000).toDateString();
        setTimeStamp(date);
    }

    const setTxt = async (e) => {
        // let obj = {
        //     "content" : [],
        //     "timeStamp": serverTimestamp(),
        //     "last editor": user.email
        // }
        // content.forEach((item,index) => obj.content.push({text:item}))
        // updateDoc(doc(db,"website-info",category),obj);
    }
    
    return(
    <div>

        <h2>Category: {category}</h2>
        <form onChange={setTheCategory}>
            <label>Choose Category:
                <select>
                    <option>Choose Category</option>
                    {
                        categories.map((cat,idx) => <option key={`${idx}`} value={cat}>{cat}</option>)
                    }
                </select>
                <button onClick={getText}>Get Text</button>
            </label>
        </form>
        <div>
            <div>Last editor: {editor}</div>
            <div>Last edited: {timeStamp}</div>

            {contentArr.map((item,index)=><div key={`k-${index}`}>
                <label>{Object.keys(item)[0]}:
                    <textarea value={item.text} />
                </label>
            </div>)}
        </div>
        <button onClick={setTxt}>Set Text</button>
    </div>
    )
}

export default Dashboard;