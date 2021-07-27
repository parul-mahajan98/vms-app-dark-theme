import React, { Component } from 'react';

import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticateUser } from '../services/user/auth/authActions';

class Login extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = this.initialState;

    }
    initialState = {
        username: '',
        password: '',
        error: ''
    };
    componentDidMount() {
        this.inputRef.current.focus()
       
    }


    resetHandler = () => {
        this.setState(() => this.initialState);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginHandler = () => {
        this.props.authenticateUser(this.state.username, this.state.password);
        setTimeout(() => {
            if (this.props.auth.isLoggedIn) {
                return this.props.history.push("/");
            } else {
                this.resetHandler();
                this.setState({
                    "error": "Invalid username and password"
                });
            }
        }, 500);
    };
    render() {
        return ( 
            <div >
            <br / >
            <Row className = "justify-content-md-center" >
            <Col xs = { 5 } > {
                this.state.error && < Alert variant = "danger" > { this.state.error } </Alert>} 
                <Card >
                <Card.Header className = "bg-dark text-white text-center" >
                <i className = "fa fa-sign-in" > </i> Login Here 
                </Card.Header > 
                <Card.Body className = "bg-dark text-white" >

                <Form >
                <Form.Group >
                <Form.Label > < i className = "fa fa-user" > </i></Form.Label >
                <Form.Control type = "text"
                required placeholder = "Username"
                className = "bg-dark text-white"
                name = "username"
                value = { this.state.username }
                onChange = { this.changeHandler}
                ref = { this.inputRef }
                / >

                </Form.Group>

                <Form.Group >
                <Form.Label > < i className = "fa fa-lock" > </i></Form.Label >
                <Form.Control type = "password"
                required placeholder = "Password"
                className = "bg-dark text-white"
                name = "password"
                value = { this.state.password }
                onChange = { this.changeHandler }
                / > 
                </Form.Group > 
                </Form >
                </Card.Body >

                <Card.Footer className = "bg-dark text-white text-center" >
                <Button variant = "primary"
                type = "submit"
                onClick = { this.loginHandler }
                disabled = { this.state.username.length === 0 || this.state.password.length === 0 } >
                <i className="fa fa-sign-in"></i> Login </Button> 
                {" "}
                <Button variant = "primary"
                type = "reset"
                onClick = { this.resetHandler }
                disabled = { this.state.username.length === 0 && this.state.password.length === 0 } >
                <i className="fa fa-undo"></i> Reset 
                </Button>  
                </Card.Footer > 
                </Card> 
                </Col > 
                </Row> 
                </div >
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.auth

        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            authenticateUser: (username, password) => {
                dispatch(authenticateUser(username, password))
            }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Login);