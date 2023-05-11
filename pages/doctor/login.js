import {useEffect} from 'react';
export default function LogInPatient(){

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(token){
            window.location.href = "/";
        }
    },[])


    async function handleSubmit(e){
        e.preventDefault();

        const formFields = ['PEmail', 'PPassword'];

        let empty = false, val = '';
        formFields.forEach(fieldName => {
            if (e.target[fieldName].value === '') {
                empty = true;
                val = fieldName;
                return;
            }
        });

        if(empty){
            alert("Fields still Empty!!");
            return;
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.PEmail.value))){
            alert("Invalid Email!!");
            return;
        }

        let data = JSON.stringify({
            email: e.target.PEmail.value,
            password: e.target.PPassword.value,
        });
        
        let res = await fetch(`/api/doctor/login`,{
            method:"POST",
            body:data,
            headers:{
                "Content-type": "application/json",
            }
        });

        let result = await res.json();
        if(result['token']){
            localStorage.setItem("token", result['token']);
            window.location.href = "/patient/viewappointment";
            
        } else{
            alert("Wrong Email or Password");
        }
    }
    return(
        <>
            <div className='container mt-4'>
                <h1 className='display-4'>Login</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type = "email" name="PEmail" placeholder="Email" className='form-control mb-1'/>
                <input type="password" name="PPassword" placeholder="Password" className='form-control mb-1'/>
                <input type="submit" value="Submit" className='btn btn-primary'/>
            </form>
            </div>
        </>
    );
}