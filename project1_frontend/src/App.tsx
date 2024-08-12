import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap'
import { NavBarComponent } from './Components/NavBarComponent';
import { LoginComponent } from './Components/LoginComponent';
import { BrowserRouter, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { AllEmployeeComponent } from './Components/EmplooyeeComponents/AllEmployeeComponent';
import { AllReimbContainerComp } from './Components/ReimbursementComponents/AllReimbContainerComp';
import { AllReimbsComponent } from './Components/ReimbursementComponents/AllReimbsComponent';
import { store } from './GlobalData/store';
import { EmployeeInterface } from './Interfaces/EmployeeInterface';
import { CreateReimbComponent } from './Components/ReimbursementComponents/CreateReimbComponent';

function App() {

  

  //Im thinking here we can conditionaly render login component or 'main', which will have nav bar
  //Im not super its super important that main be a functional component tho, so i may do it here
  //{store.loggedInUser.role === "admin" ? <button onClick={() => navigate("/users")}>Users</button> : <></>}
  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path = "/createReimb" element = {<CreateReimbComponent></CreateReimbComponent>}/>
            
            <Route path = "/login" element = {<LoginComponent></LoginComponent>}/>
            
            <Route path = "/employee" element = {   
                    <div>
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
