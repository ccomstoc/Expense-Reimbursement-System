import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EmployeeInterface } from "../../Interfaces/EmployeeInterface"
import { getDecorators } from "typescript"
import axios from "axios"

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
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" placeholder="Enter Description" onChange = {syncFormData}/>
            <label htmlFor="amount">Amount</label>
            <input type="number" name = "ammount" placeholder="Enter Ammount:"onChange = {syncFormData}/>
            <button onClick = {createReimbursement}>Create Reimbursement</button>
        </div>

    )

}