import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { EmployeeInterface } from "../../Interfaces/EmployeeInterface"
import axios from "axios"
import userEvent from "@testing-library/user-event"
import { useNavigate } from "react-router-dom"

export const AllEmployeeComponent:React.FC = () =>{

    const [employees,setEmployees] = useState<EmployeeInterface[]>([])
    const [loggedInEmp, setLoggedInEmp] = useState<EmployeeInterface>()
    const navigate = useNavigate()

    useEffect(()=>{//Sync state with currently stored logged in user
        const storedUser = localStorage.getItem('loggedInUser')
        console.log("THIS")
        console.log(localStorage.getItem('loggedInUser'))
        if(storedUser){
            let emp:EmployeeInterface = JSON.parse(storedUser)
            if(emp == null){
                setLoggedInEmp(undefined)
                navigate("/login")
            }
            else{
                setLoggedInEmp(emp)
                console.log("aaa" + loggedInEmp?.role)
                if(emp.role != 'manager')
                    navigate("/reimbursement")
            }
                

        } else{
            navigate("/login")
        }
    },[])

    useEffect(() =>{
        getEmployeeList()
    },[])


    const getEmployeeList = async () =>{

        await axios.get("http://localhost:8080/employee").then((responce) =>{
            setEmployees(responce.data)
        }).catch((error) => {
            alert(error)
        })

    }

    const deleteButton =  (id:number, username:string) =>{

        const confirmed = window.confirm('Are you sure you want to delete user: ' + username + '?');
        if(confirmed){
            axios.delete("http://localhost:8080/employee/" + id)
           getEmployeeList()
        }
        
    }

    const updateRole =  (event:any,index:number) =>{

            //so maybe pass index, access the state diectly to get the id, then update the state to reflect the change in role
            let tempEmployees:EmployeeInterface[] = employees
            tempEmployees[index].role = event.target.value
            setEmployees(tempEmployees)
            let updateData ={
                "employeeId":employees[index].employeeId,
                "role": employees[index].role
            }

            console.log(employees[index])
            axios.patch("http://localhost:8080/employee/role",updateData).catch((error) =>{
                alert(error)
            })
            window.location.reload();//can replace with useEffect listening for employee update, but infinate loop
            //getEmployeeList()
            // <select id="dropdown" value= {employee.role} onChange={(event) =>{updateRole(event,employee.employeeId,employee.username)}}>
            //                     <option value='manager'>Manager</option>
            //                     <option value='employee'>Employee</option>
            //                 </select>

        
    }

    return(

        <div>
            {loggedInEmp == undefined ? <>{navigate("/login")}</> : <></>}
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee,index) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.username}</td>
                            <td>
                            <select id="dropdown" value= {employee.role} onChange={(event) =>{updateRole(event,index)}}>
                                <option value='manager'>Manager</option>
                                <option value='employee'>Employee</option>
                            </select>
                            </td>
                            <td>
                                <button onClick = {() => deleteButton(employee.employeeId, employee.username)}>Delete</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>

    )

        


    
}