

import { useEffect, useState } from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap'
import { store } from '../GlobalData/store'
import { useStore } from '../StoreProvider'
import { EmployeeInterface } from '../Interfaces/EmployeeInterface'

export const NavBarComponent:React.FC = () => {

  const [loggedInEmp, setLoggedInEmp] = useState<EmployeeInterface>()


  useEffect(()=>{

    const storedUser = localStorage.getItem('loggedInUser');
    if(storedUser){//
      let emp = JSON.parse(storedUser)
      
      if(emp == "")
        setLoggedInEmp(undefined)
      else
        setLoggedInEmp(emp)
    }
      
  },[])

  const logout = () =>{
    setLoggedInEmp(undefined)
    localStorage.setItem('loggedInUser',"")
    window.location.reload()

  }

  


    return(
        <Navbar bg="dark" data-bs-theme="dark">

          {/*<Navbar.Brand href="/hi">Home</Navbar.Brand>*/}
          <Nav className="me-auto">
            {loggedInEmp?.role == "manager" ? <>
              <Nav.Link href="/employee">Employees</Nav.Link>
            </> : <></>} 
            <Nav.Link href="/reimbursement">Reimbursements</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {loggedInEmp != undefined ? <>
            Signed in as: {loggedInEmp.username}
            <button onClick = {logout} >Log out</button> 
            </> : <></>} 
          </Navbar.Text>
        </Navbar.Collapse>

      </Navbar>
    )

}

