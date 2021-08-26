import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.png';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";
// import ReviewForm from './ReviewForm';
// import CollectionForm from './CollectionForm';
// import ForgotPassword from './ForgotPassword';
// import Home from './Home';
// import Login from './Login';
// import Signup from './Signup';


function Navibar() {
    return (
        <div>
            {/* <Container>
                <Nav className="justify-content-end topbar">
                    <Nav.Link href="#tel:">On Call Support</Nav.Link>
                    <Nav.Link href="#link">Help</Nav.Link>
                </Nav>
            </Container> */}
            <Navbar className="nav-div" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                        alt="SafeEnviro"
                        src={Logo}
                        width="120"
                        className="d-inline-block align-top"
                        />{' '}
                    {/* SafeEnviro */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className=" justify-content-end"  id="basic-navbar-nav">
                        <Nav>
                            {/* <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink> */}
                            
                            <NavLink className="nav-link hover" activeClassName="active" to="/home">Home</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/collectionform">Collection Form</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/reviewform">Review Table</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/signup">Sign Up</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/forgotpassword">Forgot Password</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/confirmation">Confirmation</NavLink>

                            <NavLink className="nav-link" activeClassName="active" to="/login">
                                <button className="signin">SIGN IN</button>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navibar;