/*
*   Working but needs update.
*/


const handlePhone = (phone) => {
    if(phone.match(/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/gm)){
        return true
    }
    return false
}


const handleEmail = (email) => {
    if(email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)){
        return true
    }
    return false
}


const handlePassword = (password) => {

    if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)){
        return true
    }
    return false
}

const handleCPF = (cpf) => {
    if(cpf.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/)){
        return true
    }
    return false
}



export {handlePassword, handleEmail, handlePhone, handleCPF}