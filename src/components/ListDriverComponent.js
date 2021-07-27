import React, { Component } from 'react';

import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from 'react-bootstrap';

import axios from 'axios';

import MyToast from './MyToast';

class ListDriverComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            drivers: [],
            show: false,
            currentPage: 1,
            driversPerPage: 5
        }
        this.btnHandler = this.btnHandler.bind(this);
        this.editDriver = this.editDriver.bind(this);

    }

    componentDidMount() {
        this.findAllDrivers();
        
    }

    findAllDrivers() {
        axios.get("http://localhost:8080/api/v1/drivers")
            .then(response => response.data)
            .then(data => {
                this.setState({ drivers: data });
            });
    }
    deleteDriver = (driverId) => {
        axios.delete("http://localhost:8080/api/v1/drivers/" + driverId)
            .then(response => {
                if (response.data !== null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);

                    this.setState({
                        drivers: this.state.drivers.filter(driver => driver.id !== driverId)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    }
    editDriver = (id) => {
        this.props.history.push(`/edit-driver/${id}`);
    }

    btnHandler = () => {

        this.props.history.push('/add-driver');
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
        if (this.state.currentPage < Math.ceil(this.state.drivers.length / this.state.driversPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.drivers.length / this.state.driversPerPage)
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
        if (this.state.currentPage < Math.ceil(this.state.drivers.length / this.state.driversPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };

    render() {
        const { drivers, currentPage, driversPerPage } = this.state;
        const lastIndex = currentPage * driversPerPage;
        const firstIndex = lastIndex - driversPerPage;

        const currentDrivers = drivers.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(drivers.length / driversPerPage);

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
            message = { "Driver deleted successfully." }
            type = { "danger" }
            / > 
            </div >
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className = "fa fa-list" > </i> Driver List </Card.Header > 
            <Card.Body >
            <div >
            <button className = "btn btn-secondary"
            onClick = { this.btnHandler } > Add Driver </button>
            </div > 
            <br / > 
            <Table bordered hover striped variant = "dark" >
            <thead >
            <tr >
            <th > Firstname </th> 
            <th > Lastname </th> 
            <th > Date_of_Birth </th> 
            <th > Address </th> 
            <th > License_Number </th> 
            <th > License_Expiry_Date </th> 
            <th > Actions </th> 
            </tr > 
            </thead> 
            <tbody > {
                drivers.length === 0 ?
                <tr align = "center" >
                <td colSpan = "7" >
                 No Driver Available. </td> 
                </tr > : currentDrivers.map(driver => ( 
                    <tr key = { driver.id } >
                    <td > { driver.firstname } </td> 
                    <td > { driver.lastname} </td> 
                    <td > { driver.dob } </td> 
                    <td > { driver.address } </td> 
                    <td > { driver.license_Number } </td> 
                    <td > { driver.license_expiry_date } </td> 
                    <td >
                    <ButtonGroup >
                    <Button onClick = {
                        () => this.editDriver(driver.id)
                    } > < i className = "fa fa-edit" > </i></Button >
                    <Button variant = "danger"
                    onClick = { this.deleteDriver.bind(this, driver.id) } > < i className = "fa fa-trash" > </i></Button >
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





export default ListDriverComponent;