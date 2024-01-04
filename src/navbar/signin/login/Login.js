import "./Login.css";
import app from "../../../backend/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import {setDoc,doc, getFirestore, getDoc} from 'firebase/firestore'

const Logged = () => {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [msg,setMsg]=useState("please enter the correct password.the number of attempts are decreasing.so,after 5 attempts you can not login into system for one hour")
    const [count, setCount] = useState(0);
    const database=getFirestore(app);
    const [times,setTime]=useState("undefined")
   
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePass = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
  /* sending email function */
    const sendEmail = () => {
        const obj = {
            "from_name": email,
            "message":msg
        };

        emailjs.send("service_7i8s6ak", "template_pomlbn6", obj, "JPOSvQKJ0kVtpleyO")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { 
                console.log("error", err);
            });
    }
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
    const timeDifference=async()=>{
        const mail=email.split("@")[0]
         const document=doc(database,"blocked",mail)
        await getDoc(document).then((user)=>{setTime(user.data());}).catch((err)=>{console.log(err)})
        if(typeof times==="undefined"){
            return times;
        }
        if(times==="undefined"){
            return times;
        }
        console.log(times)
        const current_time= times
        const ptime=current_time
        const ctime=new Date()
        const  dtime=(ctime-ptime)/ (1000 * 60)  
        const rt=Math.ceil(dtime)
          
        return rt;
    }
    /*handling submit function */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const td=await timeDifference();
        
        if((td>=0)&&(td<=60 )){
            alert("try after "+(60-td)+" minutes")
            setEmail("")
            setPassword("")
            console.log("you can login after "+(60-td));
        }
        else{
            await signInWithEmailAndPassword(auth, email, password)
            .then(async(user) => {
                console.log("user logged in successfully", user);
                navigate("/");
               const mail=email.split("@")[0]
               await setDoc(doc(document),"channel",mail)
                
            })
            .catch((err) => {
                setEmail("");
                setPassword("")
                setCount(count + 1);
                console.log(err)
                if (count === 3) {
                    sendEmail();
                    alert("3 attempts completed");
                }
                else if(count===5){
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
                    <input className="btn" type="submit"></input>
                </div><br></br>
                <p>Do not have an account?<button onClick={signHandler}>click here for signup</button></p>
            </form>
            
        </div>
    )
}

export default Logged;
