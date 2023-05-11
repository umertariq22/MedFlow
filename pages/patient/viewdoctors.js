import WithPatientAuth from "@/components/withPatientAuth";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

function ViewDoctors({ tokenDetails, setActive }) {
  const [doctors, setDoctors] = useState(null);
  useEffect(() => {
    setActive("browse_doctor");
    (async () => {
      let res = await fetch("/api/doctor/getDoctors");
      let result = await res.json();
      setDoctors(result[0]);
      console.log(result[0]);
    })();
  }, []);
  return (
    <>
      {!doctors && <Loader />}
      {doctors && (
        <>
          <div className="container">
            <h1 className="display-4">Doctors</h1>
            <div className="row">
              {doctors.map((doctor) => (
                <div className="col-sm-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {doctor.first_name} {doctor.last_name}
                      </h5>
                      <p className="card-text">{doctor.specialization}</p>
                      <p className="card-text">{doctor.email}</p>
                      <p className="card-text">{doctor.description}</p>
                      <a
                        href={`/doctor/${doctor.doctor_id}`}
                        className="btn btn-primary"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WithPatientAuth(ViewDoctors);
