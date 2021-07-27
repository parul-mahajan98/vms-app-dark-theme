import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import Home from './components/Home';

import ListDriver from './components/ListDriver';
import ListUser from './components/ListUser';
import ListVehicle from './components/ListVehicle';
import Login from './components/Login';
import Register from './components/Register';

import VehicleObject from './components/VehicleObject';

import DriverObject from './components/DriverObject';

function App() {
    return ( <Router >
        <HeaderComponent / >
        <Switch >
        <Route path = "/"
        exact component = { Home }
        /> 
        <Route path = "/add"
        exact component = { VehicleObject }
        /> 
        <Route path = "/edit/:id"
        exact component = { VehicleObject }
        /> 
        <Route path = "/list"
        component = { ListVehicle }
        /> 
        <Route path = "/userlist"
        component = { ListUser }
        /> 
        <Route path = "/register"
        component = { Register }
        /> 
        <Route path = "/login"
        component = { Login }
        /> 
        <Route path = "/logout"
        component = { Login }
        />
        <Route path = "/driverlist"
        component = { ListDriver }
        /> 
        <Route path = "/add-driver"
        component = { DriverObject }
        /> 
        <Route path = "/edit-driver/:id"
        component = { DriverObject }
        />
 




        </Switch>

        <FooterComponent / >
        </Router>
    );
}

export default App;