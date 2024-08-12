import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import axios from "axios";

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
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" placeholder={reimb?.description} onChange = {syncFormData}/>
            <label htmlFor="amount">Amount</label>
            <input type="number" name = "ammount" placeholder={String(reimb?.amount)}  onChange = {syncFormData}/>
            <button onClick = {updateReimbursement}>Update Reimbursement</button>



        </div>

    )
}

