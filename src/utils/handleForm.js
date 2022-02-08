// Get a type (Phone, email, etc...)
// Get a value provided by the user (from a input value)
// Get the target (HTML Element itself, input here)

// Verify if the value matches with the pattern, if so...
// ... set is-valid to the target classList, else, is-invalid

const handleForm = (type, value, target) => {
  const changeClasses = (expression, target) => {
    if (!expression) {
      target.classList.remove("is-valid");
      target.classList.add("is-invalid");
    } else {
      target.classList.remove("is-invalid");
      target.classList.add("is-valid");
    }
  };

  switch (type) {
    case "phone":
      changeClasses(
        value.match(/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/gm),
        target
      );
      break;
    case "email":
      changeClasses(
        value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        target
      );
      break;
    case "password":
      changeClasses(
        value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
        ),
        target
      );
      break;
    case "confirm-password":
      changeClasses(
        value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
        ),
        target
      );
      break;
    case "cpf":
      changeClasses(value.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/), target);
      break;
    default:
      break;
  }
};

export default handleForm;
