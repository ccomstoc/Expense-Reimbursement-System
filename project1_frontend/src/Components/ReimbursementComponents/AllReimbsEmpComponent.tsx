import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const AllReimbsEmpComponent:React.FC<any> = ({onlyPending,emp}) =>{
    const [reimbursements,setReimbursements] = useState<ReimbursementInterface[]>([])
    const navigate = useNavigate()

    useEffect(() =>{
        getReimbursementList()
    },[onlyPending])

    const updateStatus =  async (event:any,index:number) =>{
        const reimbursementsState:ReimbursementInterface[] = reimbursements
        reimbursementsState[index].status = event.target.value
        setReimbursements(reimbursementsState)
        let updateData = {
                "reimbId": reimbursements[index].reimbId,
                "status": reimbursements[index].status
        }

        await axios.patch("http://localhost:8080/reimbursement/status",updateData).catch((error) => {
            alert(error)
            
        })
        getReimbursementList()
    }
    const deleteButton =  async (id:number, desc:string) =>{

        const confirmed = window.confirm('Are you sure you want to delete reimbursement: ' + desc + '?');
        if(confirmed){
            await axios.delete("http://localhost:8080/reimbursement/" + id)
            getReimbursementList()
        }
        
    }


    const getReimbursementList = async () =>{
        if(!onlyPending){

            await axios.get("http://localhost:8080/reimbursement/user/" + emp.employeeId).then((responce) =>{
                setReimbursements(responce.data)
            }).catch((error) => {
                alert(error)
            })
        } else {
            await axios.get("http://localhost:8080/reimbursement/user/" + emp.employeeId + "/PENDING").then((responce) =>{
                console.log(responce.data)
                setReimbursements(responce.data)
            }).catch((error) => {
                console.log(error)
            })
            
        }     

    }

    const editRedirect = (index:number) =>{
        const reimb = reimbursements[index]
        if(reimb.status != 'PENDING')
            alert("Can only update pending reimbursements!")
        else
            navigate("/editReimb",{state:{reimb}})
    }

    return(

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursement,index) => (
                        <tr key={reimbursement.reimbId}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>${reimbursement.amount}</td>
                            <td>{reimbursement.status}</td>
                            <td>{reimbursement.employee.username}</td>
                            <td>
                                <button onClick = {() => deleteButton(reimbursement.reimbId, reimbursement.description)}>Delete</button>
                                <button onClick ={()=>editRedirect(index)}>Edit</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>

    )


}