import { useEffect ,useState} from "react";
import withAuth from "@/components/withAuth";

function AddTimings(tokenDetails){
    const [timings,setTimings] = useState([]);

    const addTimings = async(e) =>{
        e.preventDefault();
        let timing_day = e.target.day.value;
        let start_time = e.target.startTime.value;
        let end_time = e.target.endTime.value;
        let newTimings = {timing_day,start_time,end_time};
        if (timings.some((timing) => timing.day === day)) {
            alert("Timings already added for this day");
            return;
        }        
        setTimings([...timings,newTimings]);
    }

    const sendTimings = async() =>{        
        let request = await fetch(`/api/doctor/setTimings`,{
            method:"POST",
            body:JSON.stringify({
                id:tokenDetails.id,
                timings
            }),
            headers:{
                "Content-type": "application/json",
            }
        });
        let result = await request.json();
        if(result.status === "success"){
            alert("Timings set successfully");
        }else{
            alert("Error setting timings");
        }
    }
    

    useEffect(() => {
        if(tokenDetails.type == "patient"){
            window.location.href = "/";
        }
        const timings = fetch(`/api/doctor/getTimings`,{
            method:"POST",
            body:JSON.stringify({
                id:tokenDetails.id
                }),
            headers:{
                "Content-type": "application/json",
            }
        }).then((result) => result.json()).then((result) => {

            setTimings(result);
        });
    },[])
    return (<>
        <h1>Set Timings</h1>
        <form onSubmit={addTimings}>
            <label>Start Time</label>
            <input type="time" name="startTime" id="startTime"/>
            <label>End Time</label>
            <input type="time" name="endTime" id="endTime" />
            <label>Day</label>
            <select name="day" id="day" >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thrusday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <button type="submit">Add</button>
        </form>
        <div className="addedtimings">
            <h2>Added Timings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {timings.map((timing,index) => {
                        return (<tr key={index}>
                            <td>{timing.timing_day}</td>
                            <td>{timing.start_time}</td>
                            <td>{timing.end_time}</td>
                            <td><button onClick={() => {
                                let newTimings = [...timings];
                                newTimings.splice(index,1);
                                setTimings(newTimings);
                            }}>Remove</button></td>
                        </tr>)
                    })}

                </tbody>
            </table>
            <div>
                <button onClick={sendTimings}>Set Timings</button>
            </div>
        </div>
    </>);
}

export default withAuth(AddTimings)