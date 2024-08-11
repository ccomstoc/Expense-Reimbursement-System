import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap'
import { NavBarComponent } from './Components/NavBarComponent';
import { LoginComponent } from './Components/LoginComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllEmployeeComponent } from './Components/EmplooyeeComponents/AllEmployeeComponent';
import { AllReimbContainerComp } from './Components/ReimbursementComponents/AllReimbContainerComp';
import { AllReimbsComponent } from './Components/ReimbursementComponents/AllReimbsComponent';
import { store } from './GlobalData/store';

function App() {


  //Im thinking here we can conditionaly render login component or 'main', which will have nav bar
  //Im not super its super important that main be a functional component tho, so i may do it here
  //{store.loggedInUser.role === "admin" ? <button onClick={() => navigate("/users")}>Users</button> : <></>}
  return (
    <div>
        <BrowserRouter>
          <Routes>
            
            {/*<Route path = "" element = {<LoginComponent></LoginComponent>}/>*/}
            <Route path = "" element = {<LoginComponent></LoginComponent>}/>
            <Route path = "/employee" element = {   
                    <div>
                      
                      {store.loggedInUser.employeeId != -1 ? <></> : <>-1</>}
                      <NavBarComponent></NavBarComponent>
                      <AllEmployeeComponent></AllEmployeeComponent>
                    </div>
            }/> 
            <Route path = "/reimbursement" element = {
                    <div>
                      <NavBarComponent></NavBarComponent>
                      <AllReimbContainerComp></AllReimbContainerComp>
                    </div>
                         
            }/> 
            
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
