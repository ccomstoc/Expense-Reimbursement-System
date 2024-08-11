export interface ReimbursementInterface{
    "reimbId":string,
    "description"?:string,
    "amount":number,
    "status":string,
    "employee": {
            "employeeId":number,
            "firstName":string,
            "lastName":string,
            "username":string,
            "role":string
        }
}