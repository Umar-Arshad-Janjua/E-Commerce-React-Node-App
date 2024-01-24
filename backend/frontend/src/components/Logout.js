import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';


const Logout = () => {

  const [state, dispatch] = useContext(UserContext)
    const history = useNavigate();
  
    const logout = async () =>{
        try{
          const res = await fetch('/logout', {
            method : 'GET',
            headers : {
                Accept : 'application/json',
              'Content-Type' : 'application/json'
            },
    
          });
          dispatch({type:"USER", payload:false})
          history('/loginpage')
          
    
        }catch(err){
          console.log(err)
        }
      }

    useEffect( ()=>{
        
         logout()
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default Logout
