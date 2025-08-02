import { useEffect, useState } from "react";
import axios from "axios";

export default function MenteeDashboard() {

    const [menteeData, setMenteeData] = useState({});
    const [user, setUser] = useState({});
    const [feedback, setFeedback] = useState("");

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const menteeData = JSON.parse(localStorage.getItem("menteeData"));
        setUser(user);
        setMenteeData(menteeData);
    },[]);

    const sendFeedback = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/feedback", {content: feedback}, {withCredentials: true});
            console.log("Feedback sent:", res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <h1>Hey, {user.name}</h1>
                <h2>Thank you for registering for this program.</h2>
                <h3>You will receive a confirmation email soon once you have been matched with a mentor.</h3>
            </div>
            <div>
                <textarea name="feedback" id="" placeholder="Please provide your feedback" onChange={(e)=>{setFeedback(e.target.value)}}></textarea>
                <button onClick={sendFeedback}>Send feedback</button>
            </div>
        </div>
    );
}