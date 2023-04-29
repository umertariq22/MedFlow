import React, { useState , useEffect} from 'react';
import withAuth from '@/components/withAuth';
function BloodDonation(props){
    const [result, setResult] = useState({});
    console.log(props);
    useEffect(() => {

        const token = localStorage.getItem('token');

        if(!token){
            window.location.href = "/";
        }

        const fetchData = async () => {
            const res = await fetch('/api/RetrieveUserInfo', {
                method: "POST",
                body: JSON.stringify({
                        token, PType: 'patient'
                    }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            let result = await res.json();
            setResult(result[0]);
        };
        fetchData();
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        const formFields = ['FName', 'LName', 'PhoneNum', 'email', 'blood_type', 'Address'];

        let empty = false, val = '';
        
        formFields.forEach(fieldName => {
            if (e.target[fieldName].value === '') {
                empty = true;
                val = fieldName;
            }
            return;
        });

        if(empty){
            alert(`Please enter a value for ${val}`);
            return;
        }

        let data = JSON.stringify({
            FName: e.target.FName.value,
            LName: e.target.LName.value,
            PhoneNum: e.target.PhoneNum.value,
            email: e.target.email.value,
            blood_type: e.target.blood_type.value,
            Address: e.target.Address.value
        });

        const res = await fetch('/api/SubmitBloodForm', {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let result = await res.json();

        if(result){
            alert("Thank you for donating blood!");
            window.location.href = "/MainPage/mainpagepatient";
        }
    }

    return(
        <>
            <h1>Blood Donation Form</h1>
            <p>
                If the person donating blood is somebody other than yourself,<br/>
                please fill out the form.
            </p><br/><br/>

            <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="FName" defaultValue={result.Fname} placeholder="First Name"/><br/>
                <input type="text" name="LName" defaultValue={result.Lname} placeholder="Last Name"/><br/>
                <input type="text" name="PhoneNum" defaultValue={result.PhoneNum} placeholder="Phone Number"/><br/>
                <input type="email" name="email" defaultValue={result.email} placeholder="Email"/><br/>
                <input type="text" name="blood_type" defaultValue={result.blood_type} placeholder="Blood Type"/><br/>
                <input type="text" name="Address" defaultValue={result.Address} placeholder="Address"/><br/>
                <input type="submit" value="Submit"/><br/>
            </form>
        </>
    );
}

export default withAuth(BloodDonation);
