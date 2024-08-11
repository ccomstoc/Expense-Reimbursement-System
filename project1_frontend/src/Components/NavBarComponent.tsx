

import { useEffect } from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap'
import { store } from '../GlobalData/store'
import { useStore } from '../StoreProvider'

export const NavBarComponent:React.FC = () => {

  useEffect(()=>{
    let userObject
    const storedUser = localStorage.getItem('loggedInUser');
    if(storedUser)
      userObject = JSON.parse(storedUser);
    console.log("In NAV")
    console.log(storedUser)
  })
  


    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/*<Navbar.Brand href="/hi">Home</Navbar.Brand>*/}
          <Nav className="me-auto">
            <Nav.Link href="/employee">Employees</Nav.Link>
            <Nav.Link href="/reimbursement">Reimbursements</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {/*<a href="#login">Mark Otto</a>*/} PLACE HOLDER
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )

}

