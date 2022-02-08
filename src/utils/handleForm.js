// Return a match result

const handleForm = (type, value) => {

    switch (type) {
        case 'phone':
            return value.match(/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/gm);
        case 'email':
            return value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        case 'password':
            return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)
        case 'confirm-password':
            return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)
        case 'cpf':
            return value.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/)
        default:
            break;
    }

}

export default handleForm