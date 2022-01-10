import React, { useState } from "react";
function Form () {

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({
        fullNameError: "",
        emailError: "",
        passwordError: "",
        genderError: "",
        phoneNumberError: "",

    })

    function handleChange(event) {
         
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
        case 'fullName': 
            errors.fullNameError = 
            value.length < 5
                ? 'Full Name must be at least 5 characters long!'
                : '';
            break;
        case 'email': 
            errors.emailError = 
            validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
        case 'password': 
            errors.passwordError = 
            value.length < 6
                ? 'Password must be at least 8 characters long!'
                : '';
            break;
        default:
            break;
        }
    }



    function handleSubmit(event) {
        event.preventDefault()
        var formInputs = event.target.elements
        console.log(formInputs)
        for(var i=0; i<formInputs.length; i++) {
            console.log(formInputs[i].value)
        }
        // formInputs.map(x=>console.log(x.value))
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
            Name:  <input name="name" type="text" onChange={handleChange} data-testid='name' value={fullName}/> <br/>
            Email: <input name="email" type="email" onChange={handleChange} data-testid='email' value={email} /><br/>
            <label for="gender">Gender:</label>
                <select name="gender" id="gender" onChange={handleChange} data-testid = 'gender' value={gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                </select>
            <br/>
            Phone number: <input name="phone-number" onChange={handleChange} type="text" data-testid = 'phoneNumber' value={phoneNumber}/> <br/>
            Password: <input name="password" onChange={handleChange} type="password" data-testid = 'password' value={password}/> <br/>
            <button name="submit" data-testid = 'submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form;
