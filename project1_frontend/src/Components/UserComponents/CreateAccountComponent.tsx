import axios from "axios"
import { useState } from "react"
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

        <div>
            <label htmlFor="desc">First Name</label>
            <input type="text" name="firstname" onChange = {syncFormData}/>
            <label htmlFor="lastname">Last name</label>
            <input type="text" name = "lastname"onChange = {syncFormData}/>
            <label htmlFor="username">Choose Username</label>
            <input type="text" name = "username"onChange = {syncFormData}/>
            <label htmlFor="password">Enter Password</label>
            <input type="text" name = "password"onChange = {syncFormData}/>
            <button onClick = {createUser}>Create Account</button>

        </div>

    )

}