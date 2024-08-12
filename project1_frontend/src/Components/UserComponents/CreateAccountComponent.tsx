import axios from "axios"
import { useState } from "react"
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const CreateAccountComponent:React.FC = () =>{
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()


    const syncFormData = (input:any) =>{
        
        if(input.target.name === "firstname")
            setFirstName(input.target.value)
        else if(input.target.name === "lastname")
            setLastName(input.target.value)
        else if(input.target.name === "username")
            setUsername(input.target.value)
        else if(input.target.name === "password")
            setPassword(input.target.value)
            

    }
    const createUser = async () =>{
        const userData ={
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "password": password,
        "role": "employee"
        }
        console.log("UserData")
        console.log(userData)

        await axios.post("http://localhost:8080/employee",userData).then((responce)=>{
            alert("User Created Successfully!")
            navigate("/login")
            
        }).catch((error => {
            console.log(error)
        }))




    }

    return(

        <Container>
            
            <div className="d-flex align-items-center  
            justify-content-center vh-100">
                
                
                <Card style={{ width: '30rem' }}>
                    <h1 >Create Account</h1>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            First Name
                        </InputGroup.Text>
                        <Form.Control
                            name="firstname"
                            onChange = {syncFormData}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            Last Name
                        </InputGroup.Text>
                        <Form.Control
                            name="lastname"
                            onChange = {syncFormData}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            Username
                        </InputGroup.Text>
                        <Form.Control
                            name="username"
                            onChange = {syncFormData}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            Password
                        </InputGroup.Text>
                        <Form.Control
                            name="password"
                            onChange = {syncFormData}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
      
                    <Button onClick = {createUser} variant="success">Create Account</Button>{' '}
                    <button onClick = {createUser}></button>


                </Card>
            </div>
        </Container>
    )

}