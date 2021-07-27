import React, { Component } from 'react';

import { Card, Form, Button, Row, Col } from 'react-bootstrap';

import axios from 'axios';

import MyToast from './MyToast';
import {connect} from 'react-redux';
import {addDriver,updateDriver} from '../services/driver/driverActions';

class Driver extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = this.initialState;
        this.state.show = false;
        this.changeDriver = this.changeDriver.bind(this);
        this.submitDriver = this.submitDriver.bind(this);
        this.resetDriver = this.resetDriver.bind(this);
        this.updateDriver = this.updateDriver.bind(this);
    }

    initialState = {
        id: '',
        firstname: '',
        lastname: '',
        dob: '',
        address: '',
        license_Number: '',
        license_expiry_date: ''
    }

    componentDidMount() {
        this.inputRef.current.focus()
        const driverId = +this.props.match.params.id;
        if (driverId) {
            this.findDriverById(driverId);
        }
    }

    findDriverById(driverId) {
        axios.get("http://localhost:8080/api/v1/drivers/" + driverId)
            .then(response => {
                if (response.data !== null) {
                    this.setState({
                        id: response.data.id,
                        firstname: response.data.firstname,
                        lastname: response.data.lastname,
                        dob: response.data.dob,
                        address: response.data.address,
                        license_Number: response.data.license_Number,
                        license_expiry_date: response.data.license_expiry_date
                    });
                }
            }).catch(error => {
                console.log("Error: " + error);
            });
    }

    submitDriver(e) {
        e.preventDefault();
        const driver = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dob: this.state.dob,
            address: this.state.address,
            license_Number: this.state.license_Number,
            license_expiry_date: this.state.license_expiry_date
        };


            this.props.addDriver(driver);
            setTimeout(()=>{
            if (this.props.driverObject.driver !== null) {
                            this.setState({ "show": true });
                            setTimeout(() => this.setState({ "show": false }), 1000);
                            setTimeout(() => this.cancel(), 1000);
                        } else {
                            this.setState({ "show": false });
                        }
                    },2000);
        // axios.post("http://localhost:8080/api/v1/drivers", driver)
        //     .then(response => {
        //         if (response.data !== null) {
        //             this.setState({ "show": true });
        //             setTimeout(() => this.setState({ "show": false }), 1000);
        //             setTimeout(() => this.cancel(), 1000);
        //         } else {
        //             this.setState({ "show": false });
        //         }
        //     });

    }

    updateDriver = (e) => {
        e.preventDefault();
        const driver = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dob: this.state.dob,
            address: this.state.address,
            license_Number: this.state.license_Number,
            license_expiry_date: this.state.license_expiry_date
        };
        this.props.updateDriver(driver.id,driver);
        setTimeout(()=>{
        if (this.props.driverObject.driver !== null) {
                        this.setState({ "show": true });
                        setTimeout(() => this.setState({ "show": false }), 1000);
                        setTimeout(() => this.cancel(), 1000);
    
                    } else {
                        this.setState({ "show": false });
                    }
                },2000);
        // axios.put(`http://localhost:8080/api/v1/drivers/${driver.id}`, driver)
        //     .then(response => {
        //         if (response.data !== null) {
        //             this.setState({ "show": true });
        //             setTimeout(() => this.setState({ "show": false }), 1000);
        //             setTimeout(() => this.cancel(), 1000);

        //         } else {
        //             this.setState({ "show": false });
        //         }
        //     });
    }

    changeDriver = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    resetDriver = () => {
        this.setState(() => this.initialState);
    };
    cancel = () => {
        this.props.history.push('/driverlist');
    };

    render() {
        const { firstname,lastname,dob,address,license_Number,license_expiry_date } = this.state;
        return ( 
        < > 
        <br / >
            <div style = {

                { "display": this.state.show ? "block" : null }
            } >
            <MyToast show = { this.state.show }
            message = { this.state.id ? "Driver updated successfully" : "Driver added successfully." }
            type = { "success" }
            / > 
            </div > 
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className = { this.state.id ? "fa fa-edit" : "fa fa-plus-square" } > </i> {this.state.id ? "Update Driver" : "Add New Driver"} 
            </Card.Header > 
            <Card.Body >
            <Form id = "driverFormId"
            onSubmit = { this.state.id ? this.updateDriver : this.submitDriver }
            onReset = { this.resetDriver } >
            <Row >
            <Col >

            <Form.Label > Firstname </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "firstname"
            className = { "bg-dark text-white" }
            name = "firstname"
            value = { firstname }
            onChange = { this.changeDriver }
            ref = { this.inputRef }
            / > 
            </Col >

            <Col >
            <Form.Label > Lastname </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "lastname"
            className = { "bg-dark text-white" }
            name = "lastname"
            value = { lastname }
            onChange = { this.changeDriver }
            / > 
            </Col > 
            </Row >

            <Row >
            <Col >
            <Form.Label > Date_Of_Birth </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "yyyy-mm-dd"
            className = { "bg-dark text-white" }
            name = "dob"
            value = { dob }
            onChange = { this.changeDriver }
            / > 
            </Col > 
            <Col >
            <Form.Label > Address </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "address"
            className = { "bg-dark text-white" }
            name = "address"
            value = { address }
            onChange = { this.changeDriver }
            / > 
            </Col >
            </Row> 
            <Row >
            <Col >
            <Form.Label > License_Number </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "license number"
            className = { "bg-dark text-white" }
            name = "license_Number"
            value = { license_Number }
            onChange = { this.changeDriver }
            / > 
            </Col > 
            <Col >
            <Form.Label > License_Expiry_Date </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "yyyy-mm-dd"
            className = { "bg-dark text-white" }
            name = "license_expiry_date"
            value = { license_expiry_date }
            onChange = { this.changeDriver }
            / >
            </Col >
            </Row> 
            <br / >

            <div >
            <Button variant = "success"
            type = "submit" > { this.state.id ? "Update" : "Save" } 
            </Button>    
            <Button variant = "primary"
            type = "reset"
            style = {
                { marginLeft: "10px" }
            } >
            Reset 
            </Button> 

            <Button variant = "danger"
            onClick = { this.cancel.bind(this) }
            style = {
                { marginLeft: "10px" }
            } > Cancel 
            </Button>

            </div>
            </Form > 
            </Card.Body> 
            </Card > 
            </div>
            </ >
        )
    }

}

const mapStateToProps = (state) => {
    return{
        driverObject: state.driver
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addDriver: (driver) => {
            dispatch(addDriver(driver))
        },
        updateDriver: (id,driver) => {
            dispatch(updateDriver(id,driver))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Driver);