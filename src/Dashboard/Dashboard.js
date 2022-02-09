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
    const [key, setKey] = useState("");

    const {user, categories} = useContext(StateContext);

    useEffect(()=>console.log(contentArr),[contentArr]);
    useEffect(()=>console.log(timeStamp),[timeStamp]);
    useEffect(()=>console.log(editor),[editor]);
    useEffect(()=>console.log(key),[key]);


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
        setKey(Object.keys(obj.content[0])[0]);
    }

    // MAKE SURE TO ADD ?rel=0 TO END OF EACH youtube URL!! 

    const content = [
        
            {
                title: "December 13, 2021 - School Administrators Visit HALB to See Lomdei BPL in Action",
                shortTitle: "BPL in Action at HALB",
                video: false,
                // first 6 or so pics have load: true - loads right away, never gets 'lazy' class
                pics: [
                    {
                        url: '/HALB Visit/IMG_0591.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0594.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0595.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0596.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0597.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0598.jpg',
                        alt: "HALB Visit",
                        load: true
                    },
                    {
                        url: '/HALB Visit/IMG_0599.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0600.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0601.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0603.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0604.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0605.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0606.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0607.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0608.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0609.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0610.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0611.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0612.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0613.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0614.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0615.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0616.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0617.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0618.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0619.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0620.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0621.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0624.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0625.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0626.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0628.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0629.jpg',
                        alt: "HALB Visit",
                    },
                    {
                        url: '/HALB Visit/IMG_0630.jpg',
                        alt: "HALB Visit",
                    },
                ]
            },
            {
                title: "Videos of Presentations at HALB Visit",
                shortTitle: "Video of BPL at HALB",
                video: true,
                pics: [
                    {
                        url: 'https://player.vimeo.com/video/659615125?h=68a6eb032d&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                        alt: "Mr. Altabe Talks Lomdei BPL at HALB",
                        caption: "Mr. Richard Altabe, Principal of HALB, discusses the benefits of Lomdei BPL at a principals' seminar at HALB, December 13, 2021",
                        video: true,
                        altUrl: '/HALB Visit/mr altabe video thumbnail.PNG'
                    },
                    {
                        url: 'https://player.vimeo.com/video/659616285?h=4dfc7a16d8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                        caption: "Mrs. Chani Richmond presents Lomdei's PD program on BPL at a principals' seminar at HALB, December 13, 2021",
                        alt: "Mrs. Richmond Talks Lomdei BPL at HALB",
                        video: true,
                        altUrl: '/HALB Visit/chani video thumbnail.PNG'
                    }
                ]
            },
            {
                title: "December 7, 2021 - Lomdei Visit to HALB",
                shortTitle: "Lomdei Visits HALB",
                video: false,
                pics: [
                    {
                        url: '/Dec 7 Visit/HALBVisit12_7_21 (1).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    },
                    {
                        url: '/Dec 7 Visit/HALBVisit12_7_21 (2).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    },
                    {
                        url: '/Dec 7 Visit/HALBVisit12_7_21 (3).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    },
                    {
                        url:'/Dec 7 Visit/HALBVisit12_7_21 (4).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    },
                    {
                        url: '/Dec 7 Visit/HALBVisit12_7_21 (5).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    },
                    {
                        url: '/Dec 7 Visit/HALBVisit12_7_21 (7).jpeg',
                        alt: "Lomdei Visits HALB on December 7th"
                    }
                ]
            }               
        ]

    const setTxt = async (e) => {
        let obj = {
            "content" : [],
            "timeStamp": serverTimestamp(),
            "last editor": user.email
        }
        // content.forEach((item,index) => obj.content.push({[key]:item}));
        content.forEach((item,index) => obj.content.push({pictures:item}));
        updateDoc(doc(db,"website-info",category),obj);
    }

    const displayAllText = 
    contentArr.map((item,index)=><div key={`k-${index}`}>
        <label>{key}:
            {
            typeof item[key] === "object" ? 
            <div className="textAreaGroup">{
                Object.keys(item[key]).map((innerItem,idx)=>
                    <div key={`ik-${idx}`}>
                        <label>{innerItem}:
                            {typeof innerItem === "object" ? 
                                Object.keys(innerItem).map(inInnerItem => <textarea value={item[key][innerItem][inInnerItem]}/>)
                                :  <textarea value={item[key][innerItem]}/>
                            }
                        </label>
                    </div>
                )
            }</div>
                : <textarea value={item[key]} />
            }
        </label>
    </div>)

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
            {displayAllText}
            {/* {contentArr.map((item,index)=><div key={`k-${index}`}>
                <label>{key}:
                    {
                    typeof item[key] === "object" ? 
                    <div className="textAreaGroup">{
                        Object.keys(item[key]).map((innerItem,idx)=>
                            <div key={`ik-${idx}`}>
                                <label>{innerItem}:
                                    <textarea value={item[key][innerItem]}/>
                                </label>
                            </div>
                        )
                    }</div>
                        : <textarea value={item[key]} />
                    }
                </label>
            </div>)} */}
        </div>
        <button onClick={setTxt}>Set Text</button>
    </div>
    )
}

export default Dashboard;