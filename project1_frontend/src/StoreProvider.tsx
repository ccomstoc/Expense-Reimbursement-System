import { createContext, useState, useContext, useEffect,ReactNode } from "react";
import { EmployeeInterface } from "./Interfaces/EmployeeInterface"
import { log } from "console";



const StoreContext = createContext<{
    loggedInUser: EmployeeInterface;
    setLoggedInUser: React.Dispatch<React.SetStateAction<EmployeeInterface>>;
}>({
    loggedInUser: {
        employeeId: -1,
        firstName: "",
        lastName: "",
        username: "",
        role: ""
    },
    setLoggedInUser: () => {}
})

interface StoreProviderProps {
    children: ReactNode;
}


// Create a provider component
export const StoreProvider: React.FC<StoreProviderProps> = ({children}) => {
    
    const [loggedInUser, setLoggedInUser] = useState<EmployeeInterface>({
        employeeId: -1,
        firstName: "",
        lastName: "",
        username: "",
        role: ""
    })

    useEffect(()=>{

        console.log("BeingUpdated!")
        console.log(loggedInUser)
    },[loggedInUser])


    return (
        <StoreContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </StoreContext.Provider>
    )
}

// Custom hook for using the store
export const useStore = () => useContext(StoreContext);