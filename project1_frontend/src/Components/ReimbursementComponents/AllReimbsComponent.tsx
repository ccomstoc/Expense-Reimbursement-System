import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { Container, Table } from "react-bootstrap"


export const AllReimbsComponent:React.FC<any> = ({onlyPending}) =>{
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
        console.log(onlyPending)
        if(!onlyPending){
            await axios.get("http://localhost:8080/reimbursement").then((responce) =>{
                setReimbursements(responce.data)
            }).catch((error) => {
                alert(error)
            })
        } else {
            await axios.get("http://localhost:8080/reimbursement/status/PENDING").then((responce) =>{
                console.log(responce.data)
                setReimbursements(responce.data)
            }).catch((error) => {
                alert(error)
            })
            

        }
        

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
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursement,index) => (
                        <tr key={reimbursement.reimbId}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>
                            <select id="dropdown" value= {reimbursement.status} onChange={(event) =>{updateStatus(event,index)}}>
                                <option value='PENDING'>PENDING</option>
                                <option value='DENINED'>DENINED</option>
                                <option value='APPROVED'>APPROVED</option>
                            </select>
                            </td>
                            <td>{reimbursement.employee.username}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>

    )


}