import React, { Component } from 'react';

import { Card, Form, Button, Row, Col } from 'react-bootstrap';

import axios from 'axios';

import MyToast from './MyToast';

class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = this.initialState;
        this.state.show = false;
        this.changeVehicle = this.changeVehicle.bind(this);
        this.submitVehicle = this.submitVehicle.bind(this);
        this.resetVehicle = this.resetVehicle.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this);
    }

    initialState = {
        id: '',
        vehicle_Name: '',
        vehicle_Model: '',
        vehicle_Year: '',
        chassis_Number: '',
        registration_Number: '',
        fuel_Type: ''
    }

    componentDidMount() {
        this.inputRef.current.focus()
        const vehicleId = +this.props.match.params.id;
        if (vehicleId) {
            this.findVehicleById(vehicleId);
        }
    }

    findVehicleById(vehicleId) {
        axios.get("http://localhost:8080/api/v1/vehicles/" + vehicleId)
            .then(response => {
                if (response.data !== null) {
                    this.setState({
                        id: response.data.id,
                        vehicle_Name: response.data.vehicle_Name,
                        vehicle_Model: response.data.vehicle_Model,
                        vehicle_Year: response.data.vehicle_Year,
                        chassis_Number: response.data.chassis_Number,
                        registration_Number: response.data.registration_Number,
                        fuel_Type: response.data.fuel_Type
                    });
                }
            }).catch(error => {
                console.log("Error: " + error);
            });
    }

    submitVehicle(e) {
        e.preventDefault();
        const vehicle = {
            vehicle_Name: this.state.vehicle_Name,
            vehicle_Model: this.state.vehicle_Model,
            vehicle_Year: this.state.vehicle_Year,
            chassis_Number: this.state.chassis_Number,
            registration_Number: this.state.registration_Number,
            fuel_Type: this.state.fuel_Type
        };



        axios.post("http://localhost:8080/api/v1/vehicles", vehicle)
            .then(response => {
                if (response.data !== null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 1000);
                    setTimeout(() => this.cancel(), 1000);
                } else {
                    this.setState({ "show": false });
                }
            });

    }

    updateVehicle = (e) => {
        e.preventDefault();
        const vehicle = {
            id: this.state.id,
            vehicle_Name: this.state.vehicle_Name,
            vehicle_Model: this.state.vehicle_Model,
            vehicle_Year: this.state.vehicle_Year,
            chassis_Number: this.state.chassis_Number,
            registration_Number: this.state.registration_Number,
            fuel_Type: this.state.fuel_Type
        };
        axios.put(`http://localhost:8080/api/v1/vehicles/${vehicle.id}`, vehicle)
            .then(response => {
                if (response.data !== null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 1000);
                    setTimeout(() => this.cancel(), 1000);

                } else {
                    this.setState({ "show": false });
                }
            });
    }

    changeVehicle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    resetVehicle = () => {
        this.setState(() => this.initialState);
    };
    cancel = () => {
        this.props.history.push('/list');
    };

    render() {
        const { vehicle_Name,vehicle_Model,vehicle_Year,chassis_Number,registration_Number,fuel_Type } = this.state;
        return ( 
        < > 
        <br / >
            <div style = {

                { "display": this.state.show ? "block" : null }
            } >
            <MyToast show = { this.state.show }
            message = { this.state.id ? "Vehicle updated successfully" : "Vehicle added successfully." }
            type = { "success" }
            / > 
            </div > 
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className = { this.state.id ? "fa fa-edit" : "fa fa-plus-square" } > </i> {this.state.id ? "Update Vehicle" : "Add New Vehicle"} 
            </Card.Header > 
            <Card.Body >
            <Form id = "vehicleFormId"
            onSubmit = { this.state.id ? this.updateVehicle : this.submitVehicle }
            onReset = { this.resetVehicle } >
            <Row >
            <Col >

            <Form.Label > Vehicle_Name </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle name"
            className = { "bg-dark text-white" }
            name = "vehicle_Name"
            value = { vehicle_Name }
            onChange = { this.changeVehicle }
            ref = { this.inputRef }
            / > 
            </Col >

            <Col >
            <Form.Label > Vehicle_Model </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle_model"
            className = { "bg-dark text-white" }
            name = "vehicle_Model"
            value = { vehicle_Model }
            onChange = { this.changeVehicle }
            / > 
            </Col > 
            </Row >

            <Row >
            <Col >
            <Form.Label > Vehicle_Year </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle year"
            className = { "bg-dark text-white" }
            name = "vehicle_Year"
            value = { vehicle_Year }
            onChange = { this.changeVehicle }
            / > 
            </Col > 
            <Col >
            <Form.Label > Chassis_Number </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "chassis number"
            className = { "bg-dark text-white" }
            name = "chassis_Number"
            value = { chassis_Number }
            onChange = { this.changeVehicle }
            / > 
            </Col >
            </Row> 
            <Row >
            <Col >
            <Form.Label > Registration_Number </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "registration number"
            className = { "bg-dark text-white" }
            name = "registration_Number"
            value = { registration_Number }
            onChange = { this.changeVehicle }
            / > 
            </Col > 
            <Col >
            <Form.Label > Fuel_Type </Form.Label> 
            <Form.Control as = "select"
            required className = { "bg-dark text-white" }
            name = "fuel_Type"
            value = { fuel_Type }
            onChange = { this.changeVehicle } >
            <option > PETROL </option> 
            <option > DIESEL </option> 
            <option > CNG </option>

            </Form.Control>
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
export default Vehicle;