import React, { Component } from 'react';

import { ButtonGroup, Card, Table, Button, InputGroup, FormControl, Alert,Form } from 'react-bootstrap';



import MyToast from './MyToast';
import {connect} from 'react-redux';
import {fetchVehicles,deleteVehicle} from '../services/vehicle/vehicleActions';

class ListVehicle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehicles: [],
            show: false,
            currentPage: 1,
            vehiclesPerPage: 3,
            keyword:''
        }
        this.btnHandler = this.btnHandler.bind(this);
        this.editVehicle = this.editVehicle.bind(this);

    }

    componentDidMount() {
        
        this.props.fetchVehicles();
        
    }

    
    deleteVehicle = (vehicleId) => {
        this.props.deleteVehicle(vehicleId);
        setTimeout(()=>{
        if (this.props.vehicleData.vehicle !== null) {
                        this.setState({ "show": true });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        this.props.fetchVehicles();
                        
                    } else {
                        this.setState({ "show": false });
                    }
                },2000);
        
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
    changeKeyword = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    reset = (e) => {
        this.setState({
            keyword: ''
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
        let vehiclesLength = this.props.vehicleData.vehicles.length;
        if (this.state.currentPage < Math.ceil(vehiclesLength / this.state.vehiclesPerPage)) {
            this.setState({
                currentPage: Math.ceil(vehiclesLength / this.state.vehiclesPerPage)
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
        let vehiclesLength = this.props.vehicleData.vehicles.length;
        if (this.state.currentPage < Math.ceil(vehiclesLength / this.state.vehiclesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };

    render() {
        const { currentPage, vehiclesPerPage, keyword } = this.state;
        const lastIndex = currentPage * vehiclesPerPage;
        const firstIndex = lastIndex - vehiclesPerPage;
        const vehicleData = this.props.vehicleData;
        const vehicles = vehicleData.vehicles;
        const currentVehicles = vehicles && vehicles.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        if(vehicleData.loading){
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
        else if(vehicleData.error){
            return(
                <>
                <br/>
                <br/>
                <div className="alert alert-danger"
                role="alert"> Error: {vehicleData.error}</div>
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
            message = { "Vehicle deleted successfully." }
            type = { "danger" }
            / > 
            </div >
            <div className = "container" > 
            {vehicleData.error ? 
            (<Alert variant="danger">{vehicleData.error}</Alert>):
            (
                <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > 
                <div style={{float:"left"}}> 
                < i className = "fa fa-list" > </i> Vehicle List </div>
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
            onClick = { this.btnHandler } > Add Vehicle </button>
            </div > 
            <br/>
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
                </tr > : currentVehicles.filter(vehicle => {
                    if(keyword === ""){
                        return vehicle
                    }
                    else if (vehicle.vehicle_Name.toLowerCase().includes(keyword.toLowerCase())){
                        return vehicle
                    }
                    else if (vehicle.vehicle_Model.toLowerCase().includes(keyword.toLowerCase())){
                        return vehicle
                    }
                    else if (vehicle.vehicle_Year.includes(keyword)){
                        return vehicle
                    }
                    else if (vehicle.chassis_Number.toLowerCase().includes(keyword.toLowerCase())){
                        return vehicle
                    }
                    else if (vehicle.registration_Number.toLowerCase().includes(keyword.toLowerCase())){
                        return vehicle
                    }
                    else if (vehicle.fuel_Type.toLowerCase().includes(keyword.toLowerCase())){
                        return vehicle
                    }
                }).map(vehicle => ( 
                    <tr key = { vehicle.id } >
                    <td > { vehicle.vehicle_Name } </td> 
                    <td > { vehicle.vehicle_Model} </td> 
                    <td > { vehicle.vehicle_Year } </td> 
                    <td > { vehicle.chassis_Number } </td> 
                    <td > { vehicle.registration_Number } </td> 
                    <td > { vehicle.fuel_Type } </td> 
                    <td >
                    <ButtonGroup >
                    <Button 
                    data-toggle="tooltip" title="Edit"
                    onClick = {
                        () => this.editVehicle(vehicle.id)
                    } > < i className = "fa fa-edit" > </i></Button >
                    <Button variant = "danger"
                    data-toggle="tooltip" title="Delete"
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
            )}
            
            </div> 
            </ >

        )
        }
    }

}

const mapStateToProps = (state) => {
    return{
        vehicleData:state.vehicle
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchVehicles: () => {
            dispatch(fetchVehicles())
        },
        deleteVehicle: (id) => {
            dispatch(deleteVehicle(id))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ListVehicle);