import React, { Component } from 'react';

import { Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../services/user/auth/authActions';


class HeaderComponent extends Component {
    logout = () => {
        this.props.logoutUser();
    };
    render() {
        const guestLinks = ( 
            <>
            <div className = "mr-auto" > </div> 
            <Nav className = "navbar-right" >
            <Link to = { "register" }
            className = "nav-link" >
            <i className = "fa fa-user-plus" > </i> REGISTER </Link > 
            <Link to = { "login" }
            className = "nav-link" >
            <i className = "fa fa-sign-in" > </i> LOGIN </Link > 
            </Nav >
            </>
        );
        const userLinks = ( 
            <>
            <Nav className = "mr-auto" >
            <Link to = { "/" }
            className = "nav-link" >
            <i className = "fa fa-home" > </i> HOME </Link > 
            <Link to = { "list" }
            className = "nav-link" >
            <i className = "fa fa-car" > </i> VEHICLES </Link >
            <Link to = { "driverlist" }
            className = "nav-link" >
            <i className = "fa fa-users" > </i> DRIVERS </Link >


            <Link to = { "userlist" }
            className = "nav-link" >
            <i className = "fa fa-users" > </i> USERS </Link > 
            </Nav>  
            <Nav className = "navbar-right" >
            <Link to = { "logout" }
            className = "nav-link"
            onClick = { this.logout } >
            <i className = "fa fa-sign-out" > </i> LOGOUT </Link >
            </Nav> </ >
        );
        return ( 
        <Navbar bg = "dark"
            variant = "dark" >
            <Link to = { "" }
            className = "navbar-brand text-white" >
            Vehicle Management App </Link> { this.props.auth.isLoggedIn ? userLinks : guestLinks } 
            </Navbar >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch, ) => {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);