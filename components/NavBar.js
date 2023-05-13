import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function NavBar() {
  const [specializations, setSpecializations] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenDetails, setTokenDetails] = useState(null);

  // useEffect(() => {
  //   ;
  
  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    (async () => {
      const res = await fetch("http://localhost:3000/api/getSpecializations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSpecializations(data[0]);
    })();
    let current = window.location.href.split("/")[3];
    if (current === "") current = "home";
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.id === current) item.classList.add("active");
    });
  }, []);
  
  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      let token = localStorage.getItem("token");
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
    })();
  }, [isLoggedIn]);
  return (
    <>
        <div className="container-fluid sticky-top bg-white shadow-sm">
          <div className="container">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
              <a href="index" className="navbar-brand">
                <h1 className="m-0 text-uppercase text-primary">
                  <i className="fa fa-clinic-medical me-2"></i>MEDFLOW
                </h1>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                  <a href="/" className="nav-item nav-link" id="home">
                    Home
                  </a>
                  <a href="about" className="nav-item nav-link" id="about">
                    About
                  </a>
                  <a
                    href="/doctors"
                    className="nav-item nav-link"
                    id="doctors"
                  >
                    Browse Doctors
                  </a>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Specializations
                    </a>
                    {specializations != null && (<div className="dropdown-menu m-0">
                      {specializations.map((item) => (
                        <a
                          href={`/specialization/${item.spec_id}`}
                          className="dropdown-item"
                          key={item.spec_id}
                        >
                          {item.spec_name}
                        </a>
                      ))}
                    </div>)}
                  </div>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fa fa-user text-primary"></i>
                    </a>
                    <div className="dropdown-menu m-0">
                      {isLoggedIn ? (
                        <>
                          {tokenDetails && tokenDetails.type === "doctor" ? (
                            <a href={`/doctor/`} className="dropdown-item">
                              Dashboard
                            </a>
                          ) : (
                            <a href={`/patient/`} className="dropdown-item">
                              Dashboard
                            </a>
                          )}
                          <a href="/logout" className="dropdown-item">
                            Logout
                          </a>
                        </>
                      ) : (
                        <>
                          <a href="/login" className="dropdown-item">
                            Login
                          </a>
                          <a href="/patient/signup" className="dropdown-item">
                            Patient Signup
                          </a>
                          <a href="/doctor/signup" className="dropdown-item">
                            Doctor Signup
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            </nav>
          </div>
        </div>
      
    </>
  );
}
