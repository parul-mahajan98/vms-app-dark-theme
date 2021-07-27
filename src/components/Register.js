import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Row,
    Col,
    Card,
    Form,
    InputGroup,
    FormControl,
    Button,
} from "react-bootstrap";

import { registerUser } from "../services/user/userActions";
import MyToast from "./MyToast";

class Register extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = "";
    }

    initialState = {
        username: "",
        password: "",

    };
    componentDidMount() {
        this.inputRef.current.focus()
        
    }



    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    registerUser = () => {
        let userObject = {
            username: this.state.username,
            password: this.state.password,

        };
        this.props.registerUser(userObject);
        this.resetRegisterForm();
        setTimeout(() => {
            if (this.props.user != null) {
                this.setState({ show: true });
                setTimeout(() => {
                    this.setState({ show: false });
                    this.props.history.push("/login");
                }, 3000);
            } else {
                this.setState({ show: false });
            }
        }, 2000);
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const { username, password } = this.state;

        return ( 
            <div >
            <div style = {
                { display: this.state.show ? "block" : "none" }
            } >
            <MyToast show = { this.state.show }
            message = { "User registered successfully" }
            type = { "success" }
            /> 
            </div > < br / > 
            <Row className = "justify-content-md-center" >
            <Col xs = { 5 } >
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header >

            <i className = "fa fa-user-plus" > </i> Register 
            </Card.Header > 
            <Card.Body >
            <Form.Row >
            <Form.Group as = { Col } >
            <InputGroup >
            <InputGroup.Prepend >
            <InputGroup.Text >
            <i className = "fa fa-user" > </i>
            </InputGroup.Text > 
            </InputGroup.Prepend> 
            <FormControl autoComplete = "off"
            type = "text"
            name = "username"
            value = { username }
            onChange = { this.userChange }
            className = { "bg-dark text-white" }
            placeholder = "Username" 
            ref = { this.inputRef }/
            >
            </InputGroup> 
            </Form.Group > 
            </Form.Row> 
            <Form.Row >
            <Form.Group as = { Col } >
            <InputGroup >
            <InputGroup.Prepend >
            <InputGroup.Text >
            <i className = "fa fa-lock" > </i>
            </InputGroup.Text > 
            </InputGroup.Prepend> 
            <FormControl required autoComplete = "off"
            type = "password"
            name = "password"
            value = { password }
            onChange = { this.userChange }
            className = { "bg-dark text-white" }
            placeholder = "Password" /
            >
            </InputGroup> 
            </Form.Group > 
            </Form.Row>  
            </Card.Body > 
            <Card.Footer style = {
                { textAlign: "right" }
            } >
            <Button size = "sm"
            type = "button"
            variant = "success"
            onClick = { this.registerUser }
            disabled = {
                this.state.username.length === 0 ||
                this.state.password.length === 0
            } >
            <i className = "fa fa-user-plus" > </i> Register 
            </Button > { " " } 
            <Button size = "sm"
            type = "button"
            variant = "info"
            onClick = { this.resetRegisterForm } >
            <i className = "fa fa-undo" > </i> Reset 
            </Button > 
            </Card.Footer> 
            </Card > 
            </Col> 
            </Row > 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userObject) => dispatch(registerUser(userObject)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);