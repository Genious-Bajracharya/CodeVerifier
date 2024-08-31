import { useState } from "react"
import { InputOTP,InputOTPGroup,InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

import axios from "axios";



export default function Home(){
    const [code,setCode]=useState('')
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      
        try {
          const verificationCode =code;
          console.log(code)
    
          const response = await axios.post("https://code-verifier-server.vercel.app/api/verify", {
            code: verificationCode,
          });
    
          if (response.status === 200) {
            navigate('/success')
            alert(response.data.message);
    
            setErrorMessage("");
          }
        } catch (error) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Server error, please try again later.");
          }
        }
      };
    return(
      <div className=" h-screen grid items-center">
      <div className=" p-12 bg-gray-100 mx-auto rounded-lg shadow-lg shadow-gray-200">
        <h1 className=" text-3xl font-bold text-center"> Verification Code:</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-8">
              <InputOTP maxLength={6} 
                      value={code}
                      onChange={(code) => setCode(code)}
                      >
                  <InputOTPGroup className=" gap-3 " >
                      <InputOTPSlot index={0} className="w-10 h-10 text-center text-lg border-2 hover:cursor-text  rounded border-gray-600" />
                      <InputOTPSlot index={1} className="w-10 h-10 text-center text-lg border-2 rounded border-gray-600" />
                      <InputOTPSlot index={2} className="w-10 h-10 text-center text-lg border-2 rounded border-gray-600"/>
                      <InputOTPSlot index={3} className="w-10 h-10 text-center text-lg border-2 rounded border-gray-600"/>
                      <InputOTPSlot index={4} className="w-10 h-10 text-center text-lg border-2 rounded border-gray-600"/>
                      <InputOTPSlot index={5} className="w-10 h-10 text-center text-lg border-2 rounded border-gray-600" />
                  </InputOTPGroup>
              </InputOTP>
              <button type="submit" className="mt-4 bg-indigo-950 text-white py-2 px-4 rounded w-32 ">SUBMIT</button>
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>
        </div>
        </div>
    )
}