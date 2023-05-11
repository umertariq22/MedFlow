import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/scripts/validator";
const bcrypt = require("bcryptjs");
export default function SignUpDoctor() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [errorExist, setErrorExist] = useState(true);

  const validator = (e) => {
    let errorsTemp = {};
    const formFields = {
      email: "Email",
      pass: "Password",
      fname: "First Name",
      address: "Address",
      phone: "Phone",
      spec: "Specialization",
      desc: "Description",
      lname: "Last Name",
      degree: "Degree",
    };

    Object.keys(formFields).forEach((key) => {
      if (e[key].value == "") {
        errorsTemp[key] = `${formFields[key]} is required`;
      }
    });

    if (errorsTemp.email !== "") {
      errorsTemp.email = validateEmail(e.email.value);
    }

    if (errorsTemp.pass !== "") {
      errorsTemp.pass = validatePassword(e.pass.value);
    }

    if (errorsTemp.phone !== "") {
      errorsTemp.phone = validatePhone(e.phone.value);
    }
    return errorsTemp;
  };
  async function handleSubmit(e) {
    e.preventDefault();

    let errorsTemp = validator(e.target);
    setErrors(errorsTemp);

    for (let [key, value] of Object.entries(errorsTemp)) {
      if (value != "") {
        setErrorExist(true);
        return;
      }
    }
    let pass = e.target.pass.value;
    pass = await bcrypt.hash(pass, 10);

    let data = JSON.stringify({
      email: e.target.email.value,
      password: pass,
      Fname: e.target.fname.value,
      Lname: e.target.lname.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      spec: e.target.spec.value,
      desc: e.target.desc.value,
      degree: e.target.degree.value,
    });

    let res = await fetch("/api/doctor/signup", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });

    let result = await res.json();
    if (result) {
      window.location.href = "/doctor/login";
    } else {
      alert("Email already exists");
      window.location.href = "/doctor/login";
    }
  }

  async function getSpecializations() {
    let data = await fetch("/api/getSpecializations");
    let result = await data.json();
    setSpecializations(result[0]);
    setLoading(false);
  }

  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    getSpecializations();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <div className="row h-100">
            <div className="container">
              <h1 className="display-4">Sign Up</h1>
              <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
                <div className="mb-3 row">
                  <div className="col-sm-6 ps-0">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="First Name"
                      name="fname"
                      onChange={(e) =>
                        e.target.value != ""
                          ? setErrors({ ...errors, fname: "" })
                          : setErrors({
                              ...errors,
                              fname: "First Name is required",
                            })
                      }
                    />
                    {errors.fname && (
                      <p className="ps-2 text-danger m-0">{errors.fname}</p>
                    )}
                  </div>
                  <div className="col-sm-6 pe-0">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Last Name"
                      name="lname"
                      onChange={(e) =>
                        e.target.value != ""
                          ? setErrors({ ...errors, lname: "" })
                          : setErrors({
                              ...errors,
                              lname: "Last Name is required",
                            })
                      }
                    />
                    {errors.lname && (
                      <p className="ps-2 text-danger m-0">{errors.lname}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) =>
                      setErrors({
                        ...errors,
                        email: validateEmail(e.target.value),
                      })
                    }
                  />
                  {errors.email && (
                    <p className="ps-2 text-danger m-0">{errors.email}</p>
                  )}
                </div>
                <div className="mb-3 row ">
                  <p className="ps-2 text-success m-0">
                    Password must contain at least 6 characters, 1 uppercase, 1
                    lowercase and 1 number
                  </p>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="pass"
                    onChange={(e) =>
                      setErrors({
                        ...errors,
                        pass: validatePassword(e.target.value),
                      })
                    }
                  />

                  {errors.pass && (
                    <p className="ps-2 text-danger m-0">{errors.pass}</p>
                  )}
                </div>
                <div className="row ">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    name="spec"
                    onChange={(e) =>
                      e.target.value != ""
                        ? setErrors({ ...errors, spec: "" })
                        : setErrors({
                            ...errors,
                            spec: "Specialization is required",
                          })
                    }
                  >
                    <option defaultValue value="">
                      Specialization
                    </option>
                    {specializations.map((spec) => (
                      <option key={spec.spec_id} value={spec.spec_id}>
                        {spec.spec_name}
                      </option>
                    ))}
                  </select>
                  {errors.spec && (
                    <p className="ps-2 text-danger m-0">{errors.spec}</p>
                  )}
                </div>
                <div className="mb-3 row">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Phone Number"
                    pattern="[0-9]{11}"
                    name="phone"
                    onChange={(e) =>
                      setErrors({
                        ...errors,
                        phone: validatePhone(e.target.value),
                      })
                    }
                  />
                  {errors.phone && (
                    <p className="ps-2 text-danger m-0">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-3 row">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={(e) =>
                      e.target.value != ""
                        ? setErrors({ ...errors, address: "" })
                        : setErrors({
                            ...errors,
                            address: "Address is required",
                          })
                    }
                  />
                  {errors.address && (
                    <p className="ps-2 text-danger m-0">{errors.address}</p>
                  )}
                </div>
                <div className="mb-3 row">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Description"
                    name="desc"
                    onChange={(e) =>
                      e.target.value != ""
                        ? setErrors({ ...errors, desc: "" })
                        : setErrors({
                            ...errors,
                            desc: "Description is required",
                          })
                    }
                  ></textarea>
                  <p className=" mb-0">Max 300 characters</p>
                  {errors.desc && (
                    <p className="ps-2 text-danger m-0">{errors.desc}</p>
                  )}
                </div>
                <div className="mb-3 row">
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree Information"
                    className="form-control form-control-lg"
                  />
                  {errors.degree && (
                    <p className="ps-2 text-danger m-0">{errors.degree}</p>
                  )}
                </div>
                <div className="mb-3 row">
                  <div className="d-grid col-sm-3 ps-0">
                    <input
                      type="submit"
                      className="btn btn-primary btn-large"
                      value="Sign Up"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
