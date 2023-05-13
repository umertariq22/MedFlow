import withNavbar from "@/components/withNavbar";
import { useState, useEffect } from "react";
import { validatePassword,validateEmail } from "@/scripts/validator";

function LoginPage() {
  const [selected, setSelected] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) =>{
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    let emailError = validateEmail(email);
    let passwordError = validatePassword(password);

    if (emailError || passwordError){
      setErrors({email:emailError,password:passwordError});
      return;
    }
    setErrors({});
    let link =  selected == "patient" ? "/api/patient/login" : "/api/doctor/login";
    console.log(link);
    fetch(link,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    }).then(res => res.json())
    .then(data => {
      if(data.token){
        localStorage.setItem("token",data.token);
        window.location.href = selected == "patient" ? "/patient/viewappointment" : "/doctor/viewappointment";
      }else{
        if(!data){
          setLoginError("Invalid Credentials");
        }
      }
    });

  }

  const handleChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    let error = null;
    switch(name){
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
    }
    if(error){
      setErrors({...errors,[name]:error});
    }else{
      setErrors({...errors,[name]:null});
    }
  }

  useEffect(() =>{
    setSelected("patient")
  },[])
  useEffect(() => {
    let patient = document.getElementById("patient");
    let doctor = document.getElementById("doctor");
    if (selected == "patient"){
      patient.classList.remove("btn-outline-light");
      patient.classList.add("btn-light");
      doctor.classList.remove("btn-light");
      doctor.classList.add("btn-outline-light");
    }else{
      doctor.classList.remove("btn-outline-light");
      doctor.classList.add("btn-light");
      patient.classList.remove("btn-light");
      patient.classList.add("btn-outline-light");
    }
    
  }, [selected]);


  return (
    <>
      <div className="container-fluid bg-light py-5 flex-grow-1 flex-fill">
        <div className="container py-5 bg-white ">
          <div className="row justify-content-center pe-5">
            <div className="col-lg-7 col-md-8  d-flex justify-content-center align-items-center">
              <h1 className="display-4 text-primary">
                <i className="fa fa-clinic-medical me-2"></i>MEDFLOW
              </h1>
            </div>
            <div className="col-lg-5 col-md-8">
              <div className="card bg-primary border-0">
                <div className="card-body">
                  <h6 className="text-white py-3">Welcome to Medflow</h6>
                  <h3 className="card-title text-">Login to your account</h3>
                  <div className="row py-3 ps-3 pe-3 ">
                    <div className="col-6 p-0">
                      <button
                        className="btn btn-outline-light w-100  btn-lg"
                        style={{
                          borderRadius: "0px",
                          borderTopLeftRadius: "8px",
                        }}
                        id="patient"
                        onClick={() => setSelected("patient")}
                      >
                        Patient
                      </button>
                    </div>
                    <div className="col-6 p-0">
                      <button
                        className="btn btn-outline-light w-100 btn-lg"
                        style={{
                          borderRadius: "0px",
                          borderTopRightRadius: "8px",
                        }}
                        id="doctor"
                        onClick={() => setSelected("doctor")}
                      >
                        Doctor
                      </button>
                    </div>
                  </div>
                  <form onSubmit={handleLogin}>
                    {loginError && <div className="text-danger">{loginError}</div>}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-white">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control bg-transparent border-2 text-white"
                        id="email"
                        name="email"
                        onChange={handleChange}
                      />
                      {errors && errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-transparent border-2 text-white"
                        id="password"
                        name="password"
                        onChange={handleChange}
                      />
                      {errors && errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-light">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withNavbar(LoginPage);
