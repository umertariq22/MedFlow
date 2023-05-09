import WithPatientAuth from "@/components/withPatientAuth";
import { useEffect, useState } from "react";
const moment = require("moment");

function ViewAppointment({ tokenDetails, setActive }) {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    if (tokenDetails.type == "doctor") {
      window.location.href = "/";
    }
    const appointments = fetch(`/api/patient/patientAppt`, {
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
        console.log(result[0]);
        setAppointments(result[0]);
      });
    setActive("manage_appt");
  }, []);

  async function cancelAppointment(e, id) {
    e.preventDefault();
    const res = await fetch("/api/cancelAppointment", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    window.location.reload();
  }
  return (
    <>
      <div className="container p-4">
        <h1 className="display-4">Appointments</h1>
        {appointments?.length == 0 && (
          <h3>There are no appointments to show</h3>
        )}
        {appointments?.length > 0 && (
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">Doctor</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col">View</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={`appointment-${appointment.id}`}>
                  <td className="align-middle ">
                    {appointment.doctor_first_name}{" "}
                    {appointment.doctor_last_name}
                  </td>
                  <td className="align-middle ">
                    {moment(
                      appointment.appointment_date,
                      "YYYY-MM-DD HH:mm"
                    ).format("dddd DD-MM-YYYY")}
                  </td>
                  <td className="align-middle ">
                    {moment(
                      appointment.appointment_date,
                      "YYYY-DD-MM HH:mm"
                    ).format("hh:mm A")}
                  </td>
                  <td className="align-middle ">{appointment.status}</td>
                  <td className="align-middle ">
                    {appointment.status !== "Cancelled" && appointment.status != "Completed" ? (
                      <a
                      href={`/appointment/${appointment.appointment_id}`}
                      className="btn btn-primary"
                    >
                      View
                    </a>
                    ):(
                      <a
                      href={`/appointment/${appointment.appointment_id}`}
                      className="btn btn-primary disabled"
                    >
                      View
                    </a>
                    )}
                  </td>
                  <td className="align-middle">
                    {appointment.status !== "Cancelled" &&
                    appointment.status !== "Completed" ? (
                      <button
                        onClick={(e) =>
                          cancelAppointment(e, appointment.appointment_id)
                        }
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={(e) =>
                          cancelAppointment(e, appointment.appointment_id)
                        }
                        className="btn btn-danger disabled"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function EditAppointment() {
  return <></>;
}

export default WithPatientAuth(ViewAppointment);
