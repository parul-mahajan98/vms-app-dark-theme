import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class Home extends Component {
    render() {
        return ( 
        <> 
        <br / > 
        < div className = "container" > 
        <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header className = "text-center" > WELCOME TO VEHICLE MANAGEMENT SYSTEM </Card.Header > 
            <Card.Body className = "text-center" >
            Be Limitless, Be Unstoppable. 
            </Card.Body> 
            </Card > 
            </div> 
            </ >
        )
    }
}

export default Home