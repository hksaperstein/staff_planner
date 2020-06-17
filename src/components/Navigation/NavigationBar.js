import React, { Component, Fragment } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Auth } from 'aws-amplify';

class NavigationBar extends Component {

   handleLogOut = async (event) =>{
    try {

      event.preventDefault()
      Auth.signOut()
      this.props.authProps.setAuthStatus(false)
      this.props.authProps.setUser(null)

    } catch(error){
      
      let err = null
      !error.message ? err = error.message : err = error
      console.log(err)

    }
  }

  render() {
    const create = React.createElement
    return (
      create(Navbar, {bg: "light", sticky:"top", expand: "sm"},
        create(Navbar.Brand, {href: '/'}, "Staff Planner"),
        create(Navbar.Toggle, {'aria-controls': "basic-navbar-nav"}),
        create(Navbar.Collapse, {id: "basic-navbar-nav"},
          create(Nav, {className: "ml-auto"},
            this.props.authProps.isAuthenticated && 
            this.props.authProps.user && (
              create(NavDropdown, {id:"account-dropdown", className: "text-center",title: `Hello, ${this.props.authProps.user.attributes.given_name}` },
                create(NavDropdown.Item, {href: '/personalCalendar'}, "My Calendar"),
                create(NavDropdown.Item, null, "My Work Shifts"),
                create(NavDropdown.Item, null, "Account Settings"),
                create(NavDropdown.Divider),
                create(NavDropdown.Item, {onClick: this.handleLogOut, href: '/' }, "Log Out")
              )
            ),
            !this.props.authProps.isAuthenticated && (
              create(Nav.Link, {href: '/register'}, "Register")
            ),
            !this.props.authProps.isAuthenticated && (
              create(Nav.Link, {href: '/login'}, "Log In")
            )
          )
        )
      )
    )
  }
}
export default NavigationBar;
