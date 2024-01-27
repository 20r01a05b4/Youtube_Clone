import "./signuppage.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import app from "../../../backend/Firebase"
import { getAuth } from "firebase/auth"
import { useState} from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getDatabase,ref,onValue, update} from "firebase/database"

const SignupPage=()=>{
  const navi=useNavigate()
  const auth=getAuth(app)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [conform,setConform]=useState("")
  const [channel,setChannel]=useState(null)
   
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleConform=(e)=>{
    setConform(e.target.value)
  }

  /* channel checker function */
  const channelChecker=async(user)=>{
    await new Promise((resolve)=>{
      const db=getDatabase(app);
      const refer=ref(db,user+"/channel");
      onValue(refer,(snapshot)=>{
        const data=snapshot.val();
        if(data){
          console.log(data)
          setChannel(data)
          localStorage.setItem("channel",true)
        }
        else{
          localStorage.setItem("channel",false);
        }
      })
    })
  }

  /* user email details add */
  const detailsadd=async(user_name)=>{
    const user=user_name.split("@")[0]
    await update(ref(getDatabase(app),"users/"+user), {
      time:new Date()
    });
     
  }


  const signinHandler=async(e)=>{
      e.preventDefault()
      if(password.length<=8){
        alert("password must be greater than 8 characters")
        setPassword("")
        setConform("")
        return
      }
      if (!/\d/.test(password)) {
        alert("Password must contain at least one number");
        setPassword("");
        setConform("");
        return;
      }

      if (!/[A-Z]/.test(password[0])) {
        alert("Password must contain first  one uppercase letter");
        setPassword("");
        setConform("");
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert("Password must contain at least one special character");
        setPassword("");
        setConform("");
        return;
      }

      if(password!==conform){
          alert("passwords are not matching")
          setPassword("")
          setConform("")
          return;
      } 

      await createUserWithEmailAndPassword(auth,email,password).then((user)=>{
          channelChecker(email.split("@")[0])
          detailsadd(email);
          navi("/",{channel})
          
        }).catch((e) => {
          const err = e.code;
          if (err === "auth/email-already-in-use") {
            alert("Email is already in use");
            setEmail("")
            setPassword("")
            setConform("")
          }
          else{
            alert(err)
            setEmail("")
            setPassword("")
            setConform("")
          }
        });
        return;
  }

  const logHandler=()=>{
    navi("/login")
  }
return(
  <div className="signin_contanier"> 
  <form onSubmit={signinHandler} className="signin_inner_contanier">
    <div className="email_contanier">
      <label forhtml="email_input">Email<span className="star">*</span></label>
      <input type="email" className="email_input"required maxLength="30" onChange={handleEmail} value={email}></input>
    </div><br></br>
    <div className="password_contanier">
      <label forhtml="password_input">Password<span className="star">*</span></label>
      <input type="password" className="password_input"required maxLength="30" value={password} onChange={handlePassword}></input>
    </div><br></br>
    <div className="confirm_contanier">
      <label htmlFor="email_input">Conform Password<span className="star">*</span></label>
      <input type="password" className="confirm_input"required maxLength="30" value={conform} onChange={handleConform}></input>
    </div><br></br>
    <div className="submit_button">
      <input type="submit" style={{"backgroundColor":"orange"}}></input>
    </div>
    <p style={{"color":"white"}}>already have an account?<button className="log_button"
    onClick={logHandler} style={{"color":"blue"}}>click here to login</button></p>
  </form>
</div>
)
}
export default SignupPage