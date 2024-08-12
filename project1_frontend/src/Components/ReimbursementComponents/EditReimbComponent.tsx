import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import axios from "axios";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";

export const EditReimbComponent = () =>{

    
    const location = useLocation()
    const [reimb,setReimb] = useState<ReimbursementInterface>()
    const [description,setDescription] = useState()
    const [amount,setAmount] = useState()
    const navigate = useNavigate()

    


    useEffect(()=>{
        const storedUser = localStorage.getItem('loggedInUser')
        if(storedUser == "" || !storedUser)//Redirect if not logged in
            navigate("/login")

        setReimb(location.state.reimb)
        setDescription(location.state.reimb.description)
        setAmount(location.state.reimb.amount)

        


    },[])

    const syncFormData = (input:any) =>{
        
        if(input.target.name === "desc")
            setDescription(input.target.value)
        else
            setAmount(input.target.value)
            

    }

    const updateReimbursement =async () =>{

        const formData = {
            "reimbId": reimb?.reimbId,
            "description": description,
            "amount": amount,
            "status": reimb?.status
        }

        console.log("This is form data")
        console.log(formData)

        await axios.put("http://localhost:8080/reimbursement",formData)
        navigate("/reimbursement")

    }

    
    return(

        <div>

            <Container>
                
                <div className="d-flex align-items-center  
                justify-content-center vh-100">
                    
                    <Card style={{ width: '30rem' }}>
                        <h1 >Edit Reimbursement</h1>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default" >
                                Description
                            </InputGroup.Text>
                            <Form.Control
                                name="desc"
                                placeholder={reimb?.description}
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
                                name="amount"
                                placeholder={String(reimb?.amount)}
                                onChange = {syncFormData}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <Button variant="secondary" onClick = {updateReimbursement}>Update Reimbursement</Button>{' '}

                    </Card>
                </div>
            </Container>
            


        </div>

    )
}

