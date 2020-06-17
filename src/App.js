import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar'
import LogIn from './components/Auth/LogIn'
import Register from './components/Auth/Register'
import ForgotPassword from './components/Auth/ForgotPassword'
import ForgotPasswordVerification from './components/Auth/ForgotPasswordVerification'
import ChangePassword from './components/Auth/ChangePassword'
import ChangePasswordConfirm from './components/Auth/ChangePasswordConfirm'
import Welcome from './components/Auth/Welcome'
import Home from './components/Home'
import PersonalCalendar from './components/Calendar/PersonalCalendar'
import {Auth} from 'aws-amplify'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isAuthenticated: false,
       user: null,
       isAuthenticating: true
    }
  }
  setAuthStatus = (authentication) => {
    this.setState({
      isAuthenticated: authentication
    })
  }
  setUser = user => {
    this.setState({
      user: user
    })
  }

  async componentDidMount(){
    try{

      const session = await Auth.currentSession()
      this.setAuthStatus(true)
      console.log(session)
      const user = await Auth.currentAuthenticatedUser()
      this.setUser(user)

    } catch (error) {

      console.log(error)

    }
    this.setState({
      isAuthenticating: false
    })
  }
  render(){
    const create = React.createElement
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    }

     return (
      !this.state.isAuthenticating && (
        create('div', {className: "App"},
          create(Router, null, 
            create('div', null, 
              create(NavigationBar, {authProps: authProps}),
              create(Switch, null, 
                create(Route, {
                  exact: true,
                  path:'/', 
                  render: (props) => create(Home, {...props, authProps: authProps},  null)
                }, null),
                create(Route, {
                  exact: true,
                  path:'/login', 
                  render: (props) => create(LogIn, {...props, authProps: authProps},  null)
                }, null),
                create(Route, {
                  exact: true,
                  path:'/register', 
                  render: (props) => create(Register, {...props, authProps: authProps},  null)
                }, null),
                create(Route, {
                  exact: true,
                  path:'/welcome', 
                  render: (props) => create(Welcome, {...props, authProps: authProps},  null)
                }, null),
                create(Route, {
                  exact: true,
                  path:'/personalCalendar', 
                  render: (props) => create(PersonalCalendar, {...props, authProps: authProps},  null)
                }, null)

                // create(Route, {
                //   exact,
                //   path:'/', 
                //   render: (props) => create(Home, {...props, authProps: authProps},  null)
                // }, null),
                // create(Route, {
                //   exact,
                //   path:'/', 
                //   render: (props) => create(Home, {...props, authProps: authProps},  null)
                // }, null),
              )
            )
          )
        )
      )
       
              // {/* <Route exact path="/products" component={Products} /> */}
              // {/* <Route exact path="/admin" component={ProductAdmin} /> */}
              // {/* <Route exact path="/forgotpassword" component={ForgotPassword} /> */}
              // {/* <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} /> */}
              // {/* <Route exact path="/changepassword" component={ChangePassword} /> */}
              // {/* <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} /> */}
            // {/* <Footer /> */}

    );
  }
}

export default App;
