import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let fullYear = new Date().getFullYear();
        return ( 
            <div >
            <footer className = "footer" >
            <span className = "text-muted" > All Rights Reserved { fullYear } - { fullYear + 1 }
            @VehicleManagementSystem </span> 
            </footer > 
            </div>
        );
    }
}

export default FooterComponent;