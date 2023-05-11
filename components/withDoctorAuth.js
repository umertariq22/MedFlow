import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function withDoctorAuth(WrappedComponent) {
  const Auth = () => {
    const [tokenDetails, setTokenDetails] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
      async function check() {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/doctor/login";
        } else {
          const isValid = await fetch("/api/validateToken", {
            method: "POST",
            body: JSON.stringify({
              token: token,
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
          const data = await isValid.json();
          setTokenDetails(data);
          if (data.type == "doctor") {
            setIsDoctor(true);
          } else {
            setIsDoctor(false);
            window.location.href = "/doctor/login";
          }
        }
      }

      check();
    }, []);

    useEffect(() => {
      document.querySelectorAll(".nav-link").forEach((item) => {
        item.classList.remove("active");
        if (item.id == active) {
          item.classList.add("active");
          item.classList.remove("link-dark");
        }
      });
    }, [active]);

    return (
      <>
        {!tokenDetails && !isDoctor && <Loader />}
        {tokenDetails && isDoctor && (
          <div className="row m-0">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 col-sm-2_5 p-0">
              <a
                href="/"
                className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
              >
                <span className="fs-4 ms-3">MedFlow</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li>
                  <a
                    href="/doctor/viewappointment"
                    className="nav-link link-dark"
                    id="manage_appt"
                  >
                    Manage Appointments
                  </a>
                </li>
                <li>
                  <a href="/doctor/settimings" className="nav-link link-dark" id="settimings">
                    Set Timings
                  </a>
                </li>
              </ul>
              <hr />
              <div className="btn-group dropup ms-3">
                <a
                  href="#"
                  className="link-dark text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </a>
                <ul className="dropdown-menu mb-1">
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Log Out
                    </a>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      Update Profile
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-sm-9 p-0">
              <WrappedComponent
                tokenDetails={tokenDetails}
                setActive={setActive}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  return Auth;
}
