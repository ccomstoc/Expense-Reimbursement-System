import { useState } from "react"
import { AllReimbsComponent } from "./AllReimbsComponent"


export const AllReimbContainerComp:React.FC = () => {

    const [onlyPending,setOnlyPending] = useState(false)

    const updateCheckbox = () => {
        setOnlyPending(!onlyPending)

      };
    

    return(
        <div>
                <p>Show only pending?</p>
                <input
                    type="checkbox"
                    checked={onlyPending}
                    onChange={updateCheckbox}
                    
                />
            <AllReimbsComponent onlyPending ={onlyPending}></AllReimbsComponent>
        </div>
    )

}