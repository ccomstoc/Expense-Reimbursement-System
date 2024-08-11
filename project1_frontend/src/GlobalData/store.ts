import { EmployeeInterface } from "../Interfaces/EmployeeInterface";

export const store:any = {

    //we typically want to store user session info on the front end
    //...for the sake of personalization, role-based behavior, and easier HTTP requests
    loggedInUser: {
        employeeId:0,
        firstName:"",
        lastName:"",
        username:"",
        role:""
    } as EmployeeInterface 
    
}