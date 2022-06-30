import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Complete = () => {
    const [user] = useAuthState(auth)
    const [completed,setComplete] = useState([])
 
    const newElement = completed.filter(c => c.updated)
    // console.log(newElement);
    useEffect(()=>{
        axios.get(`http://localhost:5000/todocompleted/${user?.email}`)
        .then(res => {
            setComplete(res.data)
        })
    },[user])
    return (
        <div>
            <h1 className="mt-20 text-4xl text-center">Completed Task</h1>
            <div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        <th>Task Title</th>
        <th>Task</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
        {
            newElement.map(element => 
                <tr>
                <td className="line-through">{element.name}</td>
                <td className="line-through">{element.desc}</td>
                <td>{element.status}</td>
              </tr>
                )
        }
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Complete;