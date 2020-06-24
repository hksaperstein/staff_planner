import React, { Component, Fragment } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Auth } from "aws-amplify";

class NavigationBar extends Component {
  handleLogOut = async (event) => {
    try {
      event.preventDefault();
      Auth.signOut();
      this.props.authProps.setAuthStatus(false);
      this.props.authProps.setUser(null);
    } catch (error) {
      let err = null;
      !error.message ? (err = error.message) : (err = error);
      console.log(err);
    }
  };

  render() {
    return (
      <Navbar bg="light" sticky="top" expand="sm">
        <Navbar.Brand href="/">Staff Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {this.props.authProps.isAuthenticated && this.props.authProps.user && (
              <NavDropdown id="account-dropdown" title={`Hello, ${this.props.authProps.user.attributes.given_name}`}>
                <NavDropdown.Item href="/personalCalendar">My Calendar</NavDropdown.Item>
                <NavDropdown.Item>My Work Shifts</NavDropdown.Item>
                <NavDropdown.Item>Account Settings</NavDropdown.Item>
                <NavDropdown.Divider></NavDropdown.Divider>
                <NavDropdown.Item onClick={this.handleLogOut} href="/">
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!this.props.authProps.isAuthenticated && <Nav.Link href="/register">Register</Nav.Link>}
            {!this.props.authProps.isAuthenticated && <Nav.Link href="/login">Log In</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavigationBar;
