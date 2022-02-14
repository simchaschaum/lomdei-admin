import { db } from "../firebase/firebase";
import { getDoc, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";
import './dashboard.css';

const Dashboard = ()=> {

    const [category, setCategory] = useState("Choose Category");
    const [contentArr, setContentArr] = useState([]);
    const [timeStamp, setTimeStamp] = useState("");
    const [editor, setEditor] = useState("");
    const [key, setKey] = useState("");
    const [changed, setChanged] = useState(false);

    const {user, categories} = useContext(StateContext);

    useEffect(()=>{
        if(category !== "Choose Category"){
            getInfo()
        } else {
            clearInfo()
        }
    },[category])

    const setTheCategory = (e)=>{
        e.preventDefault();
        if(!changed || window.confirm(
        `If you switch category, your changes will be lost.
        Do you want to switch anyway?`
            )){
                setCategory(e.target.value);
                setChanged(false);
            } 
        }

    const getInfo = async () => {
        const response = await getDoc(doc(db,"website-info",category));
        let obj = response.data();
        setContentArr(obj.content);
        setEditor(obj["last editor"]);
        let date = new Date(obj.timeStamp.seconds*1000).toDateString();
        setTimeStamp(date);
        setKey(Object.keys(obj.content[0])[0]);
    }
    const clearInfo = () => {
        setContentArr([]);
    }

    const handleChange = (e,index,innerItem) => {
        // index = index in content array; innerItem - for nested object only. 
        let newInfo = e.target.value;
        let arr = contentArr;
        if(innerItem){
            arr[index][key][innerItem] = newInfo;
        } else {
            arr[index] = newInfo;
        }
        setContentArr([...arr]);
        setChanged(true);
    }

    const deleteSection = (index) => {
        if(window.confirm("Are you sure you want to delete this section?")){
            let arr = contentArr;
            arr.splice(index,1);
            setContentArr([...arr]);
        }
    }

    const addSection = (index) => {
        let arr = contentArr;
        let obj;
        if(typeof contentArr[index][key] === "object"){
            let keys = Object.keys(contentArr[index][key]);
            obj = {[key]:{}}
            keys.forEach(item => obj[key][item]="");
        } else {
            obj = {
                [key] : ""
            }
        }
        contentArr.splice(index+1,0, obj);
        setContentArr([...arr]);
    }

    const saveChanges = ()=>{
        if(window.confirm("Are you sure you want to save changes to the database?")){
            setInfo();
            setChanged(false);
        }
    }

    const setInfo = async (e) => {
        let obj = {
            "content" : contentArr,
            "timeStamp": serverTimestamp(),
            "last editor": user.email
        }
        updateDoc(doc(db,"website-info",category),obj);
    }

    const clearChanges = ()=>{
        if(window.confirm(`Are you sure you want to clear all changes?`)){
            getInfo();
            setChanged(false);
        }
    }

    const displayAllText = 
    contentArr.map((item,index)=><div key={`k-${index}`}>
        <div className="info-group">
            {
            typeof item[key] === "object" ? 
            <div className="textAreaGroup">{
                Object.keys(item[key]).map((innerItem,idx)=>
                    <div key={`ik-${idx}`}>
                        <label><p>{innerItem}:</p>
                            {typeof innerItem === "object" ? 
                                Object.keys(innerItem).map(inInnerItem => <textarea id="1" onChange={handleChange} value={item[key][innerItem][inInnerItem]}/>)
                                :  <textarea id="2" onChange={(event)=>handleChange(event,index,innerItem)} value={item[key][innerItem]}/>
                            }
                        </label>
                    </div>
                )
            }</div>
                : <textarea id="3" onChange={(event)=>handleChange(event,index)} value={item[key]} /> 
            }
            <button className="add-delete" onClick={()=>deleteSection(index)}>Delete Section</button>
            <button className="add-delete" onClick={()=>addSection(index)}>Add Section Below</button>
        </div>
    </div>)

    return(
    <div>
        <div className="header">
            <h2>Category: {category !== "Choose Category"&& category}</h2>
            <form>
                <label>Category:
                    <select onChange={setTheCategory} value={category}>
                        <option>Choose Category</option>
                        {
                            categories.map((cat,idx) => <option key={`${idx}`} value={cat}>{cat}</option>)
                        }
                    </select>
                </label>
            </form>
            {contentArr.length > 0 &&
                <div className="info">
                    <p><strong>Last editor:</strong> {editor}</p>
                    <p><strong>Last edited:</strong> {timeStamp}</p>
                    {category==="platform-video-tutorials" && <h4>Make sure "?rel=0" at the end of each video URL!</h4>}
                    {changed && <div className="changes-btns"><button onClick={saveChanges}>Save Changes</button><button onClick={clearChanges}>Clear Changes</button></div>}
                </div>
            }
            
        </div>
        <div className="editing">
            {displayAllText}
            {changed && <div><button onClick={saveChanges}>Save Changes</button><button onClick={clearChanges}>Clear Changes</button></div>}
        </div>
    </div>
    )
}

export default Dashboard;