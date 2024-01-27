import "./Login.css";
import React from "react";
import app from "../../../backend/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import {setDoc,doc, getFirestore, getDoc} from 'firebase/firestore'
import { getDatabase,ref,onValue } from "firebase/database";



const Logged = () => {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [msg,setMsg]=useState("please enter the correct password.the number of attempts are decreasing.so,after 5 attempts you can not login into system for one hour")
    const [count, setCount] = useState(0);
    const database=getFirestore(app);
    const [times,setTime]=useState("undefined")
    const [emailPresent,setEmailPresent]=useState(true);
   
   
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePass = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
  /* sending email function */
    /* sending email function */
const sendEmail = async () => {
    const obj = {
        "from_name": email,
        "message": msg
    };

    try {
        const res = await emailjs.send("service_7i8s6ak", "template_pomlbn6", obj, "JPOSvQKJ0kVtpleyO");
        console.log(res);
    } catch (err) {
        console.error("Error sending email", err);
    }
};

    /* block the user for 1 hour function*/
   const blockContact=()=>{
        const mail=email.split("@")[0]
    const document=doc(database,"blocked",mail)
         setDoc(document,{
                "time":new Date(),
        }).then((user)=>{console.log("ok bro"+user)}).catch((err)=>{
            console.log("something err sir  "+err)
        })
    }

    /* checking time difference is 1 hour or not function */
    const timeDifference = async () => {
        const mail = email.split("@")[0];
        const document = doc(database, "blocked", mail);
    
        try {
            const user = await getDoc(document);
            setTime(user.data());
    
            if (typeof times === "undefined" || times === "undefined") {
                return undefined;
            }
    
            const current_time_seconds = times?.time?.seconds;
            if (current_time_seconds === undefined) {
                return undefined;
            }
    
            const ptime = current_time_seconds;
            const ctime = Math.floor(new Date().getTime() / 1000); 
            const dtime = (ctime - ptime) / 60; 
            const rt = Math.ceil(dtime);
             
            return rt;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    };
    
    /* chanel checker function */
    const channelChecker=async(user)=>{
        await new Promise((resolve)=>{
          const db=getDatabase(app);
          const refer=ref(db,user+"/channel");
          onValue(refer,(snapshot)=>{
            const data=snapshot.val();
            if(data){

            
              localStorage.setItem("channel",true);
            }
            else{
              localStorage.setItem("channel",false);
            }
          })
        })
      }
    /*email already present */
    const emailChecker = async (user) => {
        return new Promise((resolve) => {
          const dbRef = ref(getDatabase(app), "users");
          
          onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
      
            if (val && val.hasOwnProperty(user)) {
              setEmailPresent(true);
            } else {
              setEmailPresent(false);
            }
      
            resolve();
          });
        });
      };
      
      
    /*handling submit function */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await emailChecker(email.split("@")[0]);
        const td=await timeDifference(); 
        if((td>=0)&&(td<=60 )){
            alert("try after "+(60-td)+" minutes")
            setEmail("")
            setPassword("")
            return;
          
        }
        else{
            await signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                channelChecker(email.split("@")[0]);
                navigate("/");
            })
            .catch(async(err) => {
                if(!emailPresent){
                     alert("email id  not found");
                     setEmail("");
                     setPassword("")
                     return;

                }
             
                setEmail("")
                setPassword("")
                setCount((count) => count + 1);
                console.log(count)
               alert("credentials are wrong")
                if (count === 2) {
                    sendEmail();
                    alert("3 attempts completed");
                     }
                else if(count===4){
                    setMsg("You crossed the number of attempts.so you are tempraroily blocked for one hour")
                    sendEmail();
                   blockContact();
                    console.log("i need to block the account")
                }
                else if(count>=5){
                    alert("try after "+(60-td)+" minutes")
                }
                else{
                    console.log(err) 
                }     
            });
        }
    }
    const signHandler=()=>{
        navigate("/signin")
    }
    return (
        <div className="login_contanier">
            <form  className="login_inner_contanier" onSubmit={handleSubmit}>
                <div className="login_email">
                    <label htmlFor="email_input">Email<span className="star">*</span></label>
                    <input type="email" className="email_input" value={email} onChange={handleEmail} required />
                </div><br></br>
                <div className="login_password">
                    <label htmlFor="password_input">Password<span className="star">*</span></label>
                    <input type="password" className="password_input" value={password} onChange={handlePass} required />
                </div><br></br><br></br>
                <div className="login_submit_button">
                    <input className="btn" style={{"color":"red"}} type="submit"></input>
                </div><br></br>
                <p style={{"color":"white"}}>Do not have an account?<button onClick={signHandler} style={{"color":"blue"}}>click here for signup</button></p>
            </form>
            
        </div>
    )
}

export default Logged;
