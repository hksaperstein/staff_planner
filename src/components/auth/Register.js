import React, { Component } from 'react'
import {Auth} from 'aws-amplify'

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            errors:{
                cognito: null,
                blackfeild: false,
                passwordmatch: false
            }
        }
    }
    
    clearErrorState = () =>{
        this.setState({
            errors:{
                cognito: null,
                blackfeild: false,
                passwordmatch: false
            }
        })
    }
    handlerSubmit = (event) =>{
        event.preventDefault()

        this.clearErrorState();
        const error = validate(event, this.state)
        if (error){
            this.setState({
                errors:{
                    ...this.state.errors, 
                    ...error
                }
            })
        }

        const{email, password} = this.state
        try{
            
            const signUpResponse = await Auth.signUp({
                email,
                password
            })

        } catch(error){
            let err = null
            !error.message ? err = {"message": error} : err = error
            this.State({
                errors:{
                    ...this.state.errors,
                    cognito: err
                }
            })
        }

    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
        
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Register
