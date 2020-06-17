import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify'

class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      firstname: "", 
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      },
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const{firstname, lastname, username, password} = this.state
    try {

      const signUpResponse = await Auth.signUp({ 
        username,
        password,
        attributes:{
          email: username,
          given_name: firstname,
          family_name: lastname

        }
      })
      console.log(signUpResponse)
      this.props.history.push("/welcome")

    } catch(error){
      
      let err = null

      !error.message ? err = error.message : err = error
      console.log(err)
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      })

    }
  };

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    const create = React.createElement
    return (
      create('section', null, 
        create('div', null, 
          create('h1', null, "Register"),
          create(FormErrors, {formerrors: this.state.errors}),
          create('form', {onSubmit: this.handleSubmit}, 
            create('div', null, 
              create('p', null, 
                create('input', {
                  className: "input",
                  type: "text",
                  id: "firstname",
                  // ariadescribedby: "userNameHelp",
                  placeholder:"Enter First Name",
                  value: this.state.firstname,
                  onChange: this.handleInputChange
                }, null)
              )
            ),
            create('div', null, 
              create('p', null, 
                create('input', {
                  className: "input",
                  type: "text",
                  id: "lastname",
                  // ariadescribedby: "userNameHelp",
                  placeholder:"Enter Last Name",
                  value: this.state.lastname,
                  onChange: this.handleInputChange
                }, null)
              )
            ),
            create('div', null, 
              create('p', null, 
                create('input', {
                  className: "input",
                  type: "text",
                  id: "username",
                  // ariadescribedby: "userNameHelp",
                  placeholder:"Enter email",
                  value: this.state.username,
                  onChange: this.handleInputChange
                }, null)
              )
            ),
            create('div', null, 
              create('p', null, 
                create('input', {
                  className: "input",
                  type: "password",
                  id: "password",
                  // ariadescribedby: "userNameHelp",
                  placeholder:"Enter password",
                  value: this.state.password,
                  onChange: this.handleInputChange
                }, null)
              )
            ),
            create('div', null, 
              create('p', null, 
                create('input', {
                  className: "input",
                  type: "password",
                  id: "confirmpassword",
                  // ariadescribedby: "userNameHelp",
                  placeholder:"Confirm Password",
                  value: this.state.confirmpassword,
                  onChange: this.handleInputChange
                }, null)
              )
            ),
            create('div', null, 
              create('p', null, 
                create('a', {href: "/forgotpassword"}, "Forgot Password?")
              )
            ),
            create('div', null, 
              create('p', null, 
                create('button', {type: "submit"}, "Register")
              )
            )
          )
        )
      )
    )
  }
}

export default Register;