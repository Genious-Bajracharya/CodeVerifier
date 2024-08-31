
import { useNavigate } from "react-router-dom"
export default function Success(){
    const navigate=useNavigate()


    return(
        <div>
            <div className="text-5xl">Welcomeee</div> 
            <button className="mt-4 bg-indigo-950 text-white py-2 px-4 rounded w-32" onClick={()=>navigate('/')} >Go Back</button>  
        </div>
    )
}