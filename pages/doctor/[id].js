import  SetAppointment from "@/components/SetAppointment";
import tokenExtractor from "@/scripts/token";
import { useEffect, useState } from "react";
const moment = require("moment");

export default function Doctor({ doctor, timings,id }) {
  let data = doctor[0];
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tokenDetails,setTokenDetails] = useState(null);
  
  
  useEffect(() => {
    
    if (data == undefined || data.length == 0) {
      alert("No doctor found");
      window.location.href = "/";
    }
      setFname(data[0].first_name);
      setLname(data[0].last_name);
      setSpecialization(data[0].specialization);
      setEmail(data[0].email);
      setAddress(data[0].address);

      tokenExtractor().then((data) => {
        setTokenDetails(data);
      });
  }, []);
  return (
    <div>
      <h1>
        {fname} {lname}
      </h1>
      <h2>{specialization}</h2>
      <h3>{email}</h3>
      <h3>{address}</h3>
      {!tokenDetails && (<div>
        <p>You need to be logged in to book an appointment</p>
        <a href="/patient/login">Login</a>
        <p>If account does not exist</p>
        <a href="/patient/signup">Register</a>
      </div>)}
      {tokenDetails && tokenDetails.type == "doctor" && (<div>
        <p>You need to be logged in as a patient to book an appointment</p>
        <a href="/patient/login">Login</a>
        <p>If account does not exist</p>
        <a href="/patient/signup">Register</a>
      </div>)}
      {tokenDetails && tokenDetails.type == "patient" && (
        <><h3>Timings</h3>
        <SetAppointment
          timings={timings}
          id={id}
          tokenDetails={tokenDetails}
        />
        
        </>)}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `http://localhost:3000/api/doctor/searchDoctor?id=${id}`
  );
  const doctor = await res.json();
  const timingsRequest = await fetch(
    `http://localhost:3000/api/doctor/getTimings`,
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  let timings = await timingsRequest.json();
  return {
    props: {
      doctor,
      timings,
      id
    },
  };
}
