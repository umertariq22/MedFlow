const bcrypt = require("bcryptjs");
export default function SignUpDoctor(){
    async function handleSubmit(e){
        e.preventDefault();

        const formFields = ['DEmail', 'DPassword', 'DFname', 'DAddress', 'DPhone_num', 'DSpec'];

        let empty = false, val = '';
        formFields.forEach(fieldName => {
            if (e.target[fieldName].value === '' || e.target[fieldName].value === 'Specialization') {
                empty = true;
                val = fieldName;
            }
            return;
        });

        if(empty){
            alert("Fields still Empty!!");
            return;
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.DEmail.value))){
            alert("Invalid Email!!");
            return;
        }

        //at least one capital letter & one num, 6>x<20
        if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(e.target.DPassword.value))){
            alert("Invalid Password");
            return;
        }

        if(e.target.DPhone_num.value.length < 11){
            alert("Invalid Phone Number");
            return;
        }

        let DPassword = e.target.DPassword.value;
        DPassword = await bcrypt.hash(DPassword, 10);

        let data = JSON.stringify({
            email: e.target.DEmail.value,
            password: DPassword,
            Fname: e.target.DFname.value,
            Lname: e.target.DLname.value,
            address: e.target.DAddress.value,
            phone_num: e.target.DPhone_num.value,
            spec: e.target.DSpec.value,
            PType: "Doctor"
        });

        let res = await fetch("/api/doctor/signup",{
            method:"POST",
            body:data,
            headers:{
                "Content-type": "application/json"
            }
        });

        let result = await res.json();
        if(result){
            window.location.href = "/doctor/login";
        } else {
            alert("Email already exists");
            window.location.href = "/doctor/login";
        }

    }

    return(
        <>
            <form onSubmit={handleSubmit} autocomplete="off">
                <input type="text" name="DFname" placeholder="First Name"/>&nbsp;
                <input type="text" name="DLname" placeholder="Last Name"/><br/>
                <input type="email" name="DEmail" placeholder="Email"/><br/>
                <input type="password" name="DPassword" placeholder="Password"/><br/>

                <select name="DSpec">
                    <option defaultValue="Specialization">Specialization</option>
                    <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Family Physician">Family Physician</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Preventive Medicine Specialist">Preventive Medicine</option>
                </select><br/>

                <input type="text" name="DPhone_num" placeholder="Phone Number"/><br/>
                <input type="text" name="DAddress" placeholder="Address"/><br/>

                <input type="submit" value="Submit"/>
                <input type="button" value="Log In" onClick={
                    () => window.location.href = "/login"
                } />
            </form>
        </>
    );   
}