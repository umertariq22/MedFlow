const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (email == ""){
        return "Email is required";
    }else if(!re.test(email)){
        return "Email is invalid";
    }
    return "";
};

const validatePassword = (password) => {
    if(password == ""){
        return "Password is required";
    }else if(password.length < 6){
        return "Password must be at least 6 characters";
    }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)){
        return "Password must contain at least one uppercase letter, one lowercase letter and one number";
    }
    return "";
}

const validatePhone = (phone) => {
    if(phone == ""){
        return "Phone is required";
    }else if(phone.length < 11){
        return "Phone must be at least 11 characters";
    }
    return "";
}



module.exports = {
    validateEmail,
    validatePassword,
    validatePhone,
}

