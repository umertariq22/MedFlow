import { useEffect } from "react";

const bcrypt = require("bcryptjs");
export default function SignUpPatient(){
    useEffect(() =>{
        if(localStorage.getItem("token")){
            window.location.href = "/";
        }
    },[])
    async function handleSubmit(e){
        e.preventDefault();

        const formFields = ['PEmail', 'PPassword', 'PFname', 'PAddress', 'PPhone_num'];

        let empty = false, val = '';
        formFields.forEach(fieldName => {
            if (e.target[fieldName].value === '') {
                empty = true;
                val = fieldName;
            }
            return;
        });

        if(empty){
            alert("Fields still Empty!!");
            return;
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.PEmail.value))){
            alert("Invalid Email!!");
            return;
        }

        //at least one capital letter & one num, 6>x<20
        if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(e.target.PPassword.value))){
            alert("Invalid Password");
            return;
        }

        if(e.target.PPhone_num.value.length < 11){
            alert("Invalid Phone Number");
            return;
        }

        let PPassword = e.target.PPassword.value;
        PPassword = await bcrypt.hash(PPassword, 10);

        let data = JSON.stringify({
            email: e.target.PEmail.value,
            password: PPassword,
            Fname: e.target.PFname.value,
            Lname: e.target.PLname.value,
            address: e.target.PAddress.value,
            phone_num: e.target.PPhone_num.value,
            DOB: e.target.PDOB.value,
            bloodtype: e.target.PBloodtype.value,
            gender: e.target.PGender.value,
        });

        let res = await fetch("/api/patient/signup",{
            method:"POST",
            body:data,
            headers:{
                "Content-type": "application/json"
            }
        });

        let result = await res.json();
        if(result){
            window.location.href = "/patient/login";
        } else {
            alert("Email already exists!");
        }
    }
    return(
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="text" name="PFname" placeholder="First Name"/>&nbsp;
                <input type="text" name="PLname" placeholder="Last Name"/><br/>
                <input type="email" name="PEmail" placeholder="Email"/><br/>
                <input type="password" name="PPassword" placeholder="Password"/><br/>

                <label htmlFor="DOB">Date of Birth: </label>
                <input type="date" name="PDOB" defaultValue="2021-01-01" min="1950-01-01" max="2021-01-01"/><br/>
                
                <input type="text" name="PAddress" placeholder="Address"/><br/>
                <input type="text" name="PPhone_num" placeholder="Phone Number"/><br/>

                <select name="PBloodtype">
                    <option defaultValue="Bloodtype">Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select><br/>

                <input type="radio" name="PGender" value="M"/>
                    <label htmlFor="PGender">Male</label>
                <input type="radio" name="PGender" value="F"/>
                    <label htmlFor="PGender">Female</label><br/>
                
                <input type="submit" value="Submit"/>
                <input type="button" value="Log In" onClick={
                    () => window.location.href = "/login"
                } />
            </form>
        </>
    );
}