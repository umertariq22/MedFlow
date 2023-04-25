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
            window.location.href = "/";
            
        } else{
            alert("Wrong Email or Password");
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type = "email" name="PEmail" placeholder="Email"/>
                <br/>
                <input type="password" name="PPassword" placeholder="Password"/>
                <br/>
                <input type="submit" value="Submit"/><br/>
                <input type="button" value="Forgot Password?" onClick={
                    () => window.location.href = '/forgot-password'
                    } />
                <input type="button" value="Sign Up"/><br/>
                <input type="button" value="Visitor?" onClick={
                    () => (window.location.href = "/MainPage/mainpagepatient")
                }/>
            </form>
        </>
    );
}