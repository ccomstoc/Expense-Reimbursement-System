import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { Table } from "react-bootstrap"


export const AllReimbsEmpComponent:React.FC<any> = ({onlyPending,emp}) =>{
    const [reimbursements,setReimbursements] = useState<ReimbursementInterface[]>([])

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
        //window.location.reload()
        getReimbursementList()

        
        



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

    return(

        <div>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Owner</th>
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

                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>

    )


}