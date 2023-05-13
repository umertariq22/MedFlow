import withNavbar from "@/components/withNavbar";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [results, setResults] = useState([]);

  const getSpecName = (spec_id) => {
    return specializations[spec_id - 1]?.spec_name || "";
  };

  const onSearch = (e) => {
    e.preventDefault();
    let specialization = document.getElementById("specialization").value;
    let name = document.getElementById("name").value;
    console.log(specialization, name);
    let result = doctors.filter((doctor) => {
        if (specialization != "") {
            if (doctor.specialization != specialization) {
            return false;
            }
        }
        if (name != "") {
            if (
            !doctor.first_name.toLowerCase().includes(name.toLowerCase()) &&
            !doctor.last_name.toLowerCase().includes(name.toLowerCase())
            ) {
            return false;
            }
        }
        return true;
        }
    );
    setResults(result);
  };

  useEffect(() => {
    (async () => {
      let result = await fetch("/api/doctor/getAllDoctors");
      result = await result.json();
      setDoctors(result[0]);
        setResults(result[0]);
    })();
    (async () => {
      let result = await fetch("/api/getSpecializations");
      result = await result.json();
      setSpecializations(result[0]);
    })();
  }, []);
  return (
    <>
      {(doctors.length == 0) & (specializations.length == 0) &(results.length == 0)? (
        <Loader />
      ) : (
        <div className="container-fluid bg-light flex-grow-1">
          <div className="container bg-white py-2">
            <div className="row px-3">
              <div className="col-2 px-0">
                <select
                  className="form-select form-select-lg"
                  id="specialization"
                  name="specialization"
                  aria-label="Specialization"
                  aria-describedby="specialization"
                  style={{ borderRadius: "0px", borderTopLeftRadius: "0.5rem" }}
                >
                  <option value="">All Specializations</option>
                  {specializations.map((specialization) => (
                    <option
                      key={specialization.spec_id}
                      value={specialization.spec_id}
                    >
                      {specialization.spec_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col px-0">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  style={{ borderRadius: "0px" }}
                    id="name"
                />
              </div>
              <button
                className="btn btn-outline-secondary btn-lg col-2 px-0"
                type="button "
                id="button-addon2"
                style={{ borderRadius: "0px", borderTopRightRadius: "0.5rem" }}
                onClick={onSearch}
              >
                Search
              </button>
            </div>
            <div className="row mt-3">
              {results.map((doctor) => (
                <div className="col-md-6" key={doctor.doctor_id}>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="card-body">
                        <h5 className="card-title">
                          {doctor.first_name} {doctor.last_name}
                        </h5>
                        <p className="card-text">
                          {getSpecName(doctor.specialization)}
                        </p>
                        <p className="card-text">{doctor.degree}</p>
                        <p className="card-text">{doctor.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {doctor.experience} years of experience
                          </small>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Rs. {doctor.fees}
                          </small>
                        </p>
                        <a href={`/doctor/${doctor.doctor_id}`} className="btn btn-primary">
                          Book Appointment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default withNavbar(DoctorsPage);
