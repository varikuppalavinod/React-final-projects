import {useRef} from "react"
import classes from "./Forgotpassword.module.css"
import {useNavigate} from "react-router-dom"

//password reset throw email

const Forgotpassword=()=>{

  const navigate=useNavigate(); 
  const enteredemailref=useRef();

  const submithandler=(event)=>{
  event.preventDefault();
 const enteredemail=enteredemailref.current.value;

 //console.log(enteredemail)

 const url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY"
         
    fetch(url,{
        method:"POST",
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:enteredemail
        }),
        headers:{
            "Content-Type":"application/json"
        }

    }).then(res=>{
        if(res.ok){
            alert("password reset email sent! check your inbox")
            navigate("/")
        }else{
            return res.json().then(data=>{
                throw new Error(data.error.message)
            })
        }
    }).then(data=>{
       // console.log(data)
    }).catch(err=>{
        console.log(err.message)
    })

  }
  
    return(
        <div className={classes.form}>
            <form onClick={submithandler}>
                <h1>Reset Password</h1>
                <input type="email"placeholder="enter email" ref={enteredemailref}/>
                 <br></br><br></br>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Forgotpassword