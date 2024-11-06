import axios from "axios";
import { useEffect, useState } from "react";

export const User = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/user", {
            withCredentials: true
        })
            .then(res => {
                setUserData(res.data);
            })
    }, []);

    return <div>
        You're ID is {userData?.userId}
        <br/><br/>
        <button onClick={ () => {
            axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true
            })
        }}>Logout</button>
    </div>

}