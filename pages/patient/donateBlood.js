import React, { useState, useEffect } from "react";
import WithPatientAuth from "@/components/withPatientAuth";
import Loader from "@/components/Loader";

function BloodDonation({ tokenDetails, setActive }) {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setActive("donate_blood");
    const fetchData = async () => {
      const res = await fetch("/api/patient/getPatient", {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      setResult(result[0][0]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() =>{
    let x = document.getElementById("bloodSelect")?.options;
      for (let i = 0; i < x?.length; i++) {
        if (x[i].value === result.blood_type) {
          x[i].selected = true;
        }
      }
  },[result])
  async function handleSubmit(e) {
    e.preventDefault();

    const formFields = [
      "FName",
      "LName",
      "PhoneNum",
      "email",
      "blood_type",
      "Address",
    ];

    let empty = false,
      val = "";

    formFields.forEach((fieldName) => {
      if (e.target[fieldName].value === "") {
        empty = true;
        val = fieldName;
      }
      return;
    });

    if (empty) {
      alert(`Please enter a value for ${val}`);
      return;
    }

    let data = JSON.stringify({
      FName: e.target.FName.value,
      LName: e.target.LName.value,
      PhoneNum: e.target.PhoneNum.value,
      email: e.target.email.value,
      blood_type: e.target.blood_type.value,
      Address: e.target.Address.value,
    });

    const res = await fetch("/api/patient/SubmitBloodForm", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await res.json();

    if (result) {
      alert("Thank you for donating blood!");
    }
  }

  return (
    <>
        {isLoading && <Loader />}
        {!isLoading && result != {} && (
      <div className="container p-4">
        <h1 className="display-4">Blood Donation Form</h1>
        <h5>
          If the person donating blood is somebody other than yourself, please
          fill out the form.
        </h5>

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
          <input
            type="text"
            name="FName"
            defaultValue={result.first_name}
            placeholder="First Name"
            className="form-control mb-3"
          />
          <input
            type="text"
            name="LName"
            defaultValue={result.last_name}
            placeholder="Last Name"
            className="form-control mb-3"
          />

          <input
            type="text"
            name="PhoneNum"
            defaultValue={result.phone_number}
            placeholder="Phone Number"
            className="form-control mb-3"
          />

          <input
            type="email"
            name="email"
            defaultValue={result.email}
            placeholder="Email"
            className="form-control mb-3"
          />

          <select
            id="bloodSelect"
            name="blood_type"
            className="form-select mb-3"
          >
            <option>Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <input
            type="text"
            name="Address"
            defaultValue={result.address}
            placeholder="Address"
            className="form-control mb-3"
          />

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
        )}
    </>
  );
}

export default WithPatientAuth(BloodDonation);
