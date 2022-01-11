import React from 'react';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(
  /^[a-z\d\-_\s]+$/i
)

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
        mandatory: ''
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    if(!this.state.fullName || !this.state.email || !this.state.password) {
        errors.mandatory = "All fields are mandatory"
    } else {
        errors.mandatory = ""
    }

    switch (name) {
      case 'fullName': 
        errors.fullName = 
        validNameRegex.test(value)
            ? ''
            : 'Name is not alphanumeric';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email must contain @';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <input required type='text' name='fullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 && 
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input required type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input required type='password' name='password' onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='submit'>
              <button>Create</button>
              {errors.mandatory.length > 0 && 
                <span className='error'>{errors.mandatory}</span>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}



/*
var email = "john.doe@example.com";
var name   = email.substring(0, email.lastIndexOf("@"));
var domain = email.substring(email.lastIndexOf("@") +1);

console.log( name );   // john.doe
console.log( domain ); // example.com

*/