import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";

function ViewAppointment(tokenDetails) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (tokenDetails.type == "patient") {
      window.location.href = "/";
    }
    const appointments = fetch(`/api/doctor/doctorAppt`, {
      method: "POST",
      body: JSON.stringify({
        id: tokenDetails.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result)
        setAppointments(result);
      });
  }, []);

  return (
    <>
      <h1>View Appointment</h1>
      {appointments.length != 0 && <h1>{appointments[0][0].doctor_id}</h1>}
    </>
  );
}

export default withAuth(ViewAppointment);