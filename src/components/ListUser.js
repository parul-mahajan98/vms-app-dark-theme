import React, { Component } from "react";

import { connect } from "react-redux";

import {
    Card,
    Table,
    InputGroup,
    FormControl,
    Button,
    Alert,
    Form
} from "react-bootstrap";

import { fetchUsers } from "../services/user/userActions";


class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            usersPerPage: 5,
            keyword: ''
        };
    }

    componentDidMount() {

        this.props.fetchUsers();
    }


    changePage = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

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
                currentPage: 1,
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
        }
    };

    lastPage = () => {
        let usersLength = this.props.userData.users.length;
        if (
            this.state.currentPage < Math.ceil(usersLength / this.state.usersPerPage)
        ) {
            this.setState({
                currentPage: Math.ceil(usersLength / this.state.usersPerPage),
            });
        }
    };

    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.props.userData.users.length / this.state.usersPerPage)
        ) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        }
    };

    render() {
        const { currentPage, usersPerPage, keyword } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;

        const userData = this.props.userData;
        const users = userData.users;
        const currentUsers = users && users.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(users.length / usersPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        if(userData.loading){
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
        else if(userData.error){
            return(
                <>
                <br/>
                <br/>
                <div className="alert alert-danger"
                role="alert"> Error: {userData.error}</div>
                </>

            )
        }
        else{

        return ( 
           
            <div > {
                    userData.error ? ( 
                        <Alert variant = "danger" > { userData.error } </Alert>
                    ) : ( 
                    < div > 
                    < br / > 
                    < div className = "container" > 
                    <Card className = { "border border-dark bg-dark text-white" } >
                            <Card.Header >
                            <div style={{float:"left"}}>  
                            <i className = "fa fa-list" > </i> User List 
                            </div>  
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
                            <Table bordered hover striped variant = "dark" >
                            <thead >
                            <tr >
                            <th > Username </th> 
                            <th > Password </th>

                            </tr> 
                            </thead > 
                            <tbody >
                            {
                                users.length === 0 ?
                                <tr align = "center" >
                                <td colSpan = "2" >
                                No User Available. </td> 
                                </tr > : currentUsers.filter(user => {
                    if(keyword === ""){
                        return user
                    }
                    else if (user.username.toLowerCase().includes(keyword.toLowerCase())){
                        return user
                    }
                   
                }).map(user => ( 
                                    <tr key = { user.id } >
                                    <td > { user.username } </td> 
                                    <td > { user.password} </td> 
                                    
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
                            
        </Card> 
    </div >
</div>
                )
            } </div>
    );
    }
}
}

const mapStateToProps = (state) => {
    return {
        userData: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);