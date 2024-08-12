import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeInterface } from "../../Interfaces/EmployeeInterface"
import { getDecorators } from "typescript"
import axios from "axios"
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap"

export const CreateReimbComponent:React.FC = () =>{

    const [loggedInEmp, setLoggedInEmp] = useState<EmployeeInterface>()
    const [description,setDescription] = useState()
    const [amount,setAmount] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        syncLoggedInUser()
    },[])

    const syncLoggedInUser = ()=>{//Sync state with logged in user data, and manage access
        const storedUser = localStorage.getItem('loggedInUser')
        if(storedUser != "" && storedUser){//user is logged in
            let emp:EmployeeInterface = JSON.parse(storedUser)
            setLoggedInEmp(emp)
        } else{//User is not logged in
            setLoggedInEmp(undefined)
            navigate("/login")
        }
    }

    const syncFormData = (input:any) =>{
        
        if(input.target.name === "desc")
            setDescription(input.target.value)
        else
            setAmount(input.target.value)
            

    }

    const createReimbursement =async () =>{

        const formData = {
            "description": description,
            "amount": amount,
            "status": "PENDING",
            "employeeId": loggedInEmp?.employeeId
        }

        console.log("This is form data")
        console.log(formData)

        await axios.post("http://localhost:8080/reimbursement",formData)
        navigate("/reimbursement")

    }


    return(

        <div>

            <Container>
                
                <div className="d-flex align-items-center  
                justify-content-center vh-100">
                    
                    <Card style={{ width: '30rem' }}>
                        <h1 >Create Reimbursement</h1>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default" >
                                Description
                            </InputGroup.Text>
                            <Form.Control
                                name="desc"
                                placeholder="Enter Description"
                                onChange = {syncFormData}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default" >
                                Amount
                            </InputGroup.Text>
                            <Form.Control
                                type="number"
                                name = "ammount"
                                placeholder="Enter Ammount:"
                                onChange = {syncFormData}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <Button variant="secondary" onClick = {createReimbursement}>Create Reimbursement</Button>{' '}

                    </Card>
                </div>
            </Container>
        </div>

    )

}