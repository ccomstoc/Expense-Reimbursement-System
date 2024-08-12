import { useEffect, useState } from "react"
import { AllReimbsComponent } from "./AllReimbsComponent"
import { useNavigate } from "react-router-dom"
import { EmployeeInterface } from "../../Interfaces/EmployeeInterface"
import { AllReimbsEmpComponent } from "./AllReimbsEmpComponent"


export const AllReimbContainerComp:React.FC = () => {

    const [onlyPending,setOnlyPending] = useState(false)

    const [loggedInEmp, setLoggedInEmp] = useState<EmployeeInterface>()
    const navigate = useNavigate()

    useEffect(()=>{
        syncLoggedInUser()
    },[])

    const syncLoggedInUser = ()=>{//Sync state with logged in user data, and manage access 
        const storedUser = localStorage.getItem('loggedInUser')
        if(storedUser != "" && storedUser){//user is logged in
            let emp:EmployeeInterface = JSON.parse(storedUser)
            setLoggedInEmp(emp)
            if(emp.role != 'manager')//User does not have permission
                navigate("/reimbursement")
        } else{//User is not logged in
            setLoggedInEmp(undefined)
            navigate("/login")
        }
    }

    const updateCheckbox = () => {
        setOnlyPending(!onlyPending)

      };
      const createReimbRedirect = () => {
        navigate("/createReimb")

      };
    
    

    return(
        <div>
            <p>Show only pending?</p>
            <input
                type="checkbox"
                checked={onlyPending}
                onChange={updateCheckbox}
            />

            {loggedInEmp?.role == 'employee' ? 
            <>
                <button onClick = {createReimbRedirect}>New Reimbursement</button>
                <AllReimbsEmpComponent onlyPending ={onlyPending} emp={loggedInEmp}></AllReimbsEmpComponent>
            
            </> : <>
                <AllReimbsComponent onlyPending ={onlyPending}></AllReimbsComponent>
            </>}
                
        </div>
    )

}