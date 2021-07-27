import React, { Component } from 'react';

import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from 'react-bootstrap';

import axios from 'axios';

import MyToast from './MyToast';

class ListVehicleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehicles: [],
            show: false,
            currentPage: 1,
            vehiclesPerPage: 5
        }
        this.btnHandler = this.btnHandler.bind(this);
        this.editVehicle = this.editVehicle.bind(this);

    }

    componentDidMount() {
        this.findAllVehicles();
        
    }

    findAllVehicles() {
        axios.get("http://localhost:8080/api/v1/vehicles")
            .then(response => response.data)
            .then(data => {
                this.setState({ vehicles: data });
            });
    }
    deleteVehicle = (vehicleId) => {
        axios.delete("http://localhost:8080/api/v1/vehicles/" + vehicleId)
            .then(response => {
                if (response.data !== null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);

                    this.setState({
                        vehicles: this.state.vehicles.filter(vehicle => vehicle.id !== vehicleId)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    }
    editVehicle = (id) => {
        this.props.history.push(`/edit/${id}`);
    }

    btnHandler = () => {

        this.props.history.push('/add');
    }

    changePage = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.vehicles.length / this.state.vehiclesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.vehicles.length / this.state.vehiclesPerPage)
            })
        }
    }

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.vehicles.length / this.state.vehiclesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };

    render() {
        const { vehicles, currentPage, vehiclesPerPage } = this.state;
        const lastIndex = currentPage * vehiclesPerPage;
        const firstIndex = lastIndex - vehiclesPerPage;

        const currentVehicles = vehicles.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };
        return ( 
        < > 
        <br / > 
        <div style = {

                { "display": this.state.show ? "block" : null }
            } >
            <MyToast show = { this.state.show }
            message = { "Vehicle deleted successfully." }
            type = { "danger" }
            / > 
            </div >
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className = "fa fa-list" > </i> Vehicle List </Card.Header > 
            <Card.Body >
            <div >
            <button className = "btn btn-secondary"
            onClick = { this.btnHandler } > Add Vehicle </button>
            </div > 
            <br / > 
            <Table bordered hover striped variant = "dark" >
            <thead >
            <tr >
            <th > Vehicle_Name </th> 
            <th > Vehicle_Model </th> 
            <th > Vehicle_Year </th> 
            <th > Chassis_Number </th> 
            <th > Registration_Number </th> 
            <th > Fuel_Type </th> 
            <th > Actions </th> 
            </tr > 
            </thead> 
            <tbody > {
                vehicles.length === 0 ?
                <tr align = "center" >
                <td colSpan = "7" >
                 No Vehicle Available. </td> 
                </tr > : currentVehicles.map(vehicle => ( 
                    <tr key = { vehicle.id } >
                    <td > { vehicle.vehicle_Name } </td> 
                    <td > { vehicle.vehicle_Model} </td> 
                    <td > { vehicle.vehicle_Year } </td> 
                    <td > { vehicle.chassis_Number } </td> 
                    <td > { vehicle.registration_Number } </td> 
                    <td > { vehicle.fuel_Type } </td> 
                    <td >
                    <ButtonGroup >
                    <Button onClick = {
                        () => this.editVehicle(vehicle.id)
                    } > < i className = "fa fa-edit" > </i></Button >
                    <Button variant = "danger"
                    onClick = { this.deleteVehicle.bind(this, vehicle.id) } > < i className = "fa fa-trash" > </i></Button >
                    </ButtonGroup> 
                    </td > 
                    </tr>
                ))
            }

            </tbody> 
            </Table > 
            </Card.Body> 
            <Card.Footer >
            <div style = {
                { "float": "left" }
            } >
            Showing Page { currentPage }
            of { totalPages } </div> 
            <div style = {
                { "float": "right" }
            } >
            <InputGroup >
            <InputGroup.Prepend >
            <Button type = "button"
            variant = "secondary"
            disabled = { currentPage === 1 ? true : false }
            onClick = { this.firstPage } >
            <i className = "fa fa-fast-backward" > </i> First 
            </Button > 
            <Button type = "button"
            variant = "secondary"
            disabled = { currentPage === 1 ? true : false }
            onClick = { this.prevPage } >
            <i className = "fa fa-step-backward" > </i> Prev 
            </Button > 
            </InputGroup.Prepend > 
            <FormControl style = { pageNumCss }
            className = { "bg-dark" }
            name = "currentPage"
            value = { currentPage }
            onChange = { this.changePage }
            / > 
            <InputGroup.Append >
            <Button type = "button"
            variant = "secondary"
            disabled = { currentPage === totalPages ? true : false }
            onClick = { this.nextPage } >
            Next <i className = "fa fa-step-forward" > </i> 
            </Button > 
            <Button type = "button"
            variant = "secondary"
            disabled = { currentPage === totalPages ? true : false }
            onClick = { this.lastPage } >
            Last <i className = "fa fa-fast-forward" > </i> 
            </Button > 
            </InputGroup.Append > 
            </InputGroup> 
            </div > 
            </Card.Footer >

            </Card >
            </div> 
            </ >

        )
    }

}





export default ListVehicleComponent;