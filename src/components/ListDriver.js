import React, { Component } from 'react';

import { ButtonGroup, Card, Table, Button, InputGroup, FormControl, Alert, Form } from 'react-bootstrap';


import MyToast from './MyToast';
import {connect} from 'react-redux';
import {fetchDrivers,deleteDriver} from '../services/driver/driverActions';

class ListDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            drivers: [],
            show: false,
            currentPage: 1,
            driversPerPage: 3,
            keyword: ''
        }
        this.btnHandler = this.btnHandler.bind(this);
        this.editDriver = this.editDriver.bind(this);

    }

    componentDidMount() {
        
        this.props.fetchDrivers();
        
    }

    reset = (e) => {
        this.setState({
            keyword: ''
        })
    }
    
    deleteDriver = (driverId) => {
        this.props.deleteDriver(driverId);
        setTimeout(()=>{
        if (this.props.driverData.driver !== null) {
                        this.setState({ "show": true });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        this.props.fetchDrivers();
                        
                    } else {
                        this.setState({ "show": false });
                    }
                },2000);
        
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

    changeKeyword = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
        let driversLength = this.props.driverData.drivers.length;
        if (this.state.currentPage < Math.ceil(driversLength / this.state.driversPerPage)) {
            this.setState({
                currentPage: Math.ceil(driversLength / this.state.driversPerPage)
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
        let driversLength = this.props.driverData.drivers.length;
        if (this.state.currentPage < Math.ceil(driversLength / this.state.driversPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };

    render() {
        const { currentPage, driversPerPage, keyword } = this.state;
        const lastIndex = currentPage * driversPerPage;
        const firstIndex = lastIndex - driversPerPage;
        const driverData = this.props.driverData;
        const drivers = driverData.drivers;
        const currentDrivers = drivers && drivers.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(drivers.length / driversPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };


        if(driverData.loading){
            return(
                <>
                <br/>
                <br/>
                <div className="text-center">
                <button className="btn btn-dark text-center" disabled>
                <span className="spinner-border spinner-border-sm"></span>
                Loading...
                </button>
                </div>
                </>
            )
        }
        else if(driverData.error){
            return(
                <>
                <br/>
                <br/>
                <div className="alert alert-danger"
                role="alert"> Error: {driverData.error}</div>
                </>

            )
        }
        else{

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
            {driverData.error ? 
            (<Alert variant="danger">
                {driverData.error}
            </Alert>):(
                    <Card className = { "border border-dark bg-dark text-white" } >
                    <Card.Header > 
                    <div style={{float:"left"}}>
                    < i className = "fa fa-list" > </i> Driver List </div>
                    <div style={{float:"right"}}>
                    <InputGroup>
                        <Form.Control type = "text"
                        placeholder = "Search..."
                        className = { "bg-dark text-white" }
                        name = "keyword"
                        value = { keyword }
                        onChange = { this.changeKeyword }
                        
                        / > 
                    <InputGroup.Append >
                    <Button type = "button"
                    data-toggle="tooltip" title="Cancel"
                    variant = "light"
                    disabled = { this.state.keyword === '' ? true : false }
                    onClick = { this.reset } > <i className = "fa fa-close" > </i> 
                    </Button > 
                    
                    </InputGroup.Append > 

                    </InputGroup>
                    </div > 
                            </Card.Header > 
                    <Card.Body >
                    <div>
                    <button className = "btn btn-secondary"
                    onClick = { this.btnHandler } > Add Driver </button>
                    </div > 
                    <br/>
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
                        </tr > : currentDrivers.filter(driver => {
                    if(keyword === ""){
                        return driver
                    }
                    else if (driver.firstname.toLowerCase().includes(keyword.toLowerCase())){
                        return driver
                    }
                    else if (driver.lastname.toLowerCase().includes(keyword.toLowerCase())){
                        return driver
                    }
                    else if (driver.dob.includes(keyword)){
                        return driver
                    }
                    else if (driver.address.toLowerCase().includes(keyword.toLowerCase())){
                        return driver
                    }
                    else if (driver.license_Number.toLowerCase().includes(keyword.toLowerCase())){
                        return driver
                    }
                    else if (driver.license_expiry_date.toLowerCase().includes(keyword.toLowerCase())){
                        return driver
                    }
                }).map(driver => ( 
                            <tr key = { driver.id } >
                            <td > { driver.firstname } </td> 
                            <td > { driver.lastname} </td> 
                            <td > { driver.dob } </td> 
                            <td > { driver.address } </td> 
                            <td > { driver.license_Number } </td> 
                            <td > { driver.license_expiry_date } </td> 
                            <td >
                            <ButtonGroup >
                            <Button 
                            data-toggle="tooltip" title="Edit"
                            onClick = {
                                () => this.editDriver(driver.id)
                            } > < i className = "fa fa-edit" > </i></Button >
                            <Button variant = "danger"
                            data-toggle="tooltip" title="Delete"
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
            )}
            
            </div> 
            </ >

        )
    }
    }

}


const mapStateToProps = (state) => {
    return{
        driverData:state.driver
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchDrivers: () => {
            dispatch(fetchDrivers())
        },
        deleteDriver: (id) => {
            dispatch(deleteDriver(id))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ListDriver);