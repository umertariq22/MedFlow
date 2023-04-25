
// export default function ForgotPassword(){

//     async function handleSubmit(e){
//         e.preventDefault();

//         const formFields = ['email', 'new_password', 'confirm_password'];

//         let empty = false, val = '';
//         formFields.forEach(fieldName => {
//             if (e.target[fieldName].value === '') {
//                 empty = true;
//                 val = fieldName;
//             }
//             return;
//         });

//         if(empty){
//             alert("Fields still Empty!!");
//             return;
//         }

//         if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.email.value))){
//             alert("Invalid Email!!");
//             return;
//         }

//         if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(e.target.new_password.value))){
//             alert("Invalid Password");
//             return;
//         }

//         if(e.target.new_password.value !== e.target.confirm_password.value){
//             alert("New password doesn't match!!");
//             return;
//         }

//         let data = JSON.stringify({
//             email: e.target.email.value,
//             newpassword: e.target.new_password.value,
//             PType: e.target.person_type.value
//         });

//         let res = await fetch("/api/changepassword", {
//             method:"POST",
//             body:data,
//             headers:{
//                 "Content-type": "application/json"
//             }
//         });

//         let result = await res.json();

//         if(result){
//             window.location.href = "/login";
//         }else{
//             if(result === "same") alert("New password is the same as the old one");
//             else alert("Email not found");
//         }

//     }
//     return(
//         <>
//             <form onSubmit={handleSubmit} autocomplete="off">
//                 <input type="radio" name="person_type" value="Doctor"/>
//                     <label htmlFor="person_type">Doctor</label>
//                 <input type="radio" name="person_type" value="Patient"/>
//                     <label htmlFor="person_type">Patient</label><br/>

//                 <input type="email" name="email" placeholder="Email"/><br/>

//                 <input type="password" name="new_password" placeholder="Enter new password"/><br/>
//                 <input type="password" name="confirm_password" placeholder="Confirm password"/><br/>

//                 <input type="submit" value="Submit"/>
//             </form>
//         </>
//     );
// }


export default function ForgotPassword(){
    return(
        <>
            <h1>Forgot Password</h1>
            <form>
                <input type="email" name="email" placeholder="Email"/><br/>
                <input type="submit" value="Submit"/><br/>
            </form>
        </>        
    );
}