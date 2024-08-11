import { useEffect, useState } from "react"
import { AllReimbsComponent } from "./AllReimbsComponent"
import { useNavigate } from "react-router-dom"
import { EmployeeInterface } from "../../Interfaces/EmployeeInterface"


export const AllReimbContainerComp:React.FC = () => {

    const [onlyPending,setOnlyPending] = useState(false)

    const [loggedInEmp, setLoggedInEmp] = useState<EmployeeInterface>()
    const navigate = useNavigate()

    useEffect(()=>{//Sync state with currently stored logged in user
        const storedUser = localStorage.getItem('loggedInUser');
        
        if(storedUser){
            let emp = JSON.parse(storedUser)
            if(emp == ""){
                setLoggedInEmp(undefined)
                navigate("/login")
            }
            else{
                setLoggedInEmp(emp)
            }

            
                
        } else{
            navigate("/login")
        }

        
            

    },[])

    const updateCheckbox = () => {
        setOnlyPending(!onlyPending)
        console.log("IN Reimb")
        console.log(loggedInEmp)

      };
    

    return(
        <div>
               {loggedInEmp?.role == 'employee' ? <>YEAAAAA</> : <>
                <p>Show only pending?</p>
                    <input
                        type="checkbox"
                        checked={onlyPending}
                        onChange={updateCheckbox}
                    />
                    <AllReimbsComponent onlyPending ={onlyPending}></AllReimbsComponent>
               </>}
                
        </div>
    )

}