import withNavbar from "@/components/withNavbar";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/scripts/validator";
import { useEffect, useState } from "react";
const bcrypt = require("bcryptjs");

function SignUpPatient() {
  const [errors, setErrors] = useState({});
  const validator = (e) => {
    let errorsTemp = {};
    const formFields = {
      email: "Email",
      password: "Password",
      fname: "First Name",
      address: "Address",
      phone: "Phone Number",
      lname: "Last Name",
      bloodtype: "Blood Type",
      gender: "Gender",
      dob:"Date of Birth"
    };

    Object.keys(formFields).forEach((key) => {
      if (e[key].value == "") {
        errorsTemp[key] = `${formFields[key]} is required`;
      }
    });

    if (errorsTemp.email !== "") {
      errorsTemp.email = validateEmail(e.email.value);
    }

    if (errorsTemp.password !== "") {
      errorsTemp.password = validatePassword(e.password.value);
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
        return;
      }
    }

    let password = e.target.password.value;
    password = await bcrypt.hash(password, 10);

    let data = JSON.stringify({
      email: e.target.email.value,
      password: password,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      DOB: e.target.dob.value,
      bloodtype: e.target.bloodtype.value,
      gender: e.target.gender.value,
    });

    let res = await fetch("/api/patient/signup", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });

    let result = await res.json();
    if (result) {
      window.location.href = "/";
    } else {
      alert("Email already exists!");
    }
  }
  return (
    <>
      <div className="container" style={{maxWidth:"500px"}}>
        <form autoComplete="off" onSubmit={handleSubmit} style={{maxWidth:"400px"}} className="text-center">
        <h1 className="display-4 mt-4 text-center">Signup</h1>
          <div className="row mb-3">
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              className="form-control form-control-lg "
              onChange={(e) => {
                e.target.value != ""
                  ? setErrors({ ...errors, fname: "" })
                  : setErrors({
                      ...errors,
                      fname: "First Name is required",
                    });
              }}
            />
            {errors.fname && <p className="text-danger">{errors.fname}</p>}
          </div>
          <div className="row mb-3">
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              className="form-control form-control-lg "
              onChange={(e) => {
                e.target.value != ""
                  ? setErrors({ ...errors, lname: "" })
                  : setErrors({
                      ...errors,
                      lname: "Last Name is required",
                    });
              }}
            />
            {errors.lname && <p className="text-danger">{errors.lname}</p>}
          </div>
          <div className="row mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control form-control-lg "
              onChange={(e) =>
                setErrors({
                  ...errors,
                  email: validateEmail(e.target.value),
                })
              }
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="row mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control form-control-lg "
              onChange={(e) =>
                setErrors({
                  ...errors,
                  password: validatePassword(e.target.value),
                })
              }
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div className="row mb-3">
            <input
              type="date"
              name="dob"
              min="1950-01-01"
              className="form-control form-control-lg "
              onChange={(e) => {
                e.target.value != ""
                  ? setErrors({ ...errors, dob: "" })
                  : setErrors({
                      ...errors,
                      dob: "Date of Birth is required",
                    });
              }}
            />
            {errors.dob && <p className="text-danger">{errors.dob}</p>}
          </div>
          <div className="row mb-3">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="form-control form-control-lg "
              onChange={(e) => {
                e.target.value != ""
                  ? setErrors({ ...errors, address: "" })
                  : setErrors({
                      ...errors,
                      address: "Address is required",
                    });
              }}
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
          <div className="row mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="form-control form-control-lg "
              onChange={(e) =>
                setErrors({
                  ...errors,
                  phone: validatePhone(e.target.value),
                })
              }

            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
          <div className="row mb-3">
            <select name="bloodtype" className="form-select form-select-lg "
            onChange={(e) => {
              e.target.value != ""
                ? setErrors({ ...errors, bloodtype: "" })
                : setErrors({
                    ...errors,
                    bloodtype: "Blood Type is required",
                  });
            }}
            >
              <option defaultValue value="">
                Blood Type
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodtype && (
              <p className="text-danger">{errors.bloodtype}</p>
            )}
          </div>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="M"
                className="form-check-input"
                id="RMale"
              />
              <label htmlFor="RMale" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline ">
              <input
                type="radio"
                name="gender"
                value="F"
                className="form-check-input"
                id="RFemale"
              />
              <label htmlFor="RFemale" className="form-check-label">
                Female
              </label>
            </div>
            {errors.gender && <p className="text-danger">{errors.gender}</p>}
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-primary col-12"
          />
        </form>
      </div>
    </>
  );
}

export default withNavbar(SignUpPatient);
