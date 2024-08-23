
import {useRef,useState} from "react"
import classes from "./Authform.module.css"
import {useNavigate} from "react-router-dom"
//import ExpenseForm from "../Expenses/ExpenseForm"

import {authActions} from "../Store/auth"
import{useSelector,useDispatch} from "react-redux"

const Authform=()=>{
    //redux
   // console.log("this is redux")
    const dispatch=useDispatch()
    const isLoggedin=useSelector(state=>state.auth.isLoggedin)
    console.log("this is redux",isLoggedin)
 
  const[isLogin,setisLogin]=useState(true)
 
  const inputemail=useRef()
  const inputpassword=useRef()
  const inputconformpassword=useRef()

  const navigate=useNavigate();

  const switchhandler=()=>{
    setisLogin(prevstate=>!prevstate)
  }

  const submithandler=(event)=>{
     event.preventDefault()
     const enteredemail=inputemail.current.value;
    const  enteredpassword=inputpassword.current.value;
    const  entercorrectpassword=inputconformpassword.current.value;

    if(enteredpassword!==entercorrectpassword){
      alert("passwords do not match!")
      return;
    }

    //console.log(enteredemail,enteredpassword,entercorrectpassword)
    let url;
    if(isLogin){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSCGMswFE4FDOLlmSRFNO6Uk1-ZuJ6w_o"
    }else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSCGMswFE4FDOLlmSRFNO6Uk1-ZuJ6w_o"
    }       
    fetch(url,{
      method:"POST",
      body:JSON.stringify({
        email:enteredemail,
        password:enteredpassword,
        returnSecureToken:true,
      }),
      headers:{
        "Content-Type":"application/json",
      },
    }).then((res)=>{
      if(!res.ok){
        return res.json().then((data)=>{
          throw new Error(data.error.message)
        })
      }
      return res.json()

    }).then((data)=>{
      dispatch(authActions.login(data.idToken))
      
     // navigate("/welcome")
     
      console.log(data)
      console.log("use has successfully signed up")
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return(
 <div style={{display:"flex",width:"100%"}}>
 {!isLoggedin&&<div style={{display:"flex",flexDirection:"column",margin:"auto",alignItems:"center",position:"relative",top:"10rem"}}>
 
 <div className={classes.authform}>
 <form onSubmit={submithandler}>
     <h1>{isLogin?"Login":"Sign Up"}</h1>
     
     <input type="email" placeholder="email" autoComplete="email" ref={inputemail}/>
     <br></br><br></br>
     <input type="password" placeholder="enterpassword" autoComplete="new-password" ref={inputpassword}/>
     <br></br><br></br>
     <input type="password" placeholder="conformpassword" autoComplete="new-password" ref={inputconformpassword} />
      <br></br><br></br>
     <button type="submit">{isLogin?"Login":"Sign up"}</button>
     <br></br><br></br>
     </form>
     <button onClick={()=>{navigate("/forgotpassword")}}>Forgot password</button>
     </div>
     <div>
     <button className={classes.signupbutton}  type="button"
      onClick={switchhandler}
     > {isLogin?"Dont have an account? signup":"Have an account? login"}</button>
     </div>
</div>}


 </div>


  )
}
export default Authform


/*

import {useRef,useState} from "react"
import classes from "./Authform.module.css"
import {useNavigate} from "react-router-dom"
import ExpenseForm from "../Expenses/ExpenseForm"

import {authActions} from "../Store/auth"
import{useSelector,useDispatch} from "react-redux"

const Authform=()=>{
    //redux
   // console.log("this is redux")
    const dispatch=useDispatch()
    const isLoggedin=useSelector(state=>state.auth.isLoggedin)
    console.log("this is redux",isLoggedin)
 
  const[isLogin,setisLogin]=useState(true)
 
  const inputemail=useRef()
  const inputpassword=useRef()
  const inputconformpassword=useRef()

  const navigate=useNavigate();

  const switchhandler=()=>{
    setisLogin(prevstate=>!prevstate)
  }

  const submithandler=(event)=>{
     event.preventDefault()
     const enteredemail=inputemail.current.value;
    const  enteredpassword=inputpassword.current.value;
    const  entercorrectpassword=inputconformpassword.current.value;

    if(enteredpassword!==entercorrectpassword){
      alert("passwords do not match!")
      return;
    }

    //console.log(enteredemail,enteredpassword,entercorrectpassword)
    let url;
    if(isLogin){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSCGMswFE4FDOLlmSRFNO6Uk1-ZuJ6w_o"
    }else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSCGMswFE4FDOLlmSRFNO6Uk1-ZuJ6w_o"
    }       
    fetch(url,{
      method:"POST",
      body:JSON.stringify({
        email:enteredemail,
        password:enteredpassword,
        returnSecureToken:true,
      }),
      headers:{
        "Content-Type":"application/json",
      },
    }).then((res)=>{
      if(!res.ok){
        return res.json().then((data)=>{
          throw new Error(data.error.message)
        })
      }
      return res.json()

    }).then((data)=>{
      dispatch(authActions.login(data.idToken))
      
     // navigate("/welcome")
     
      console.log(data)
      console.log("use has successfully signed up")
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return(
 <div>
 {!isLoggedin&&<div style={{display:"flex",flexDirection:"column",margin:"auto",alignItems:"center",position:"relative",top:"10rem"}}>
 
 <div className={classes.authform}>
 <form onSubmit={submithandler}>
     <h1>{isLogin?"Login":"Sign Up"}</h1>
     
     <input type="email" placeholder="email" autoComplete="email" ref={inputemail}/>
     <br></br><br></br>
     <input type="password" placeholder="enterpassword" autoComplete="new-password" ref={inputpassword}/>
     <br></br><br></br>
     <input type="password" placeholder="conformpassword" autoComplete="new-password" ref={inputconformpassword} />
      <br></br><br></br>
     <button type="submit">{isLogin?"Login":"Sign up"}</button>
     <br></br><br></br>
     </form>
     <button onClick={()=>{navigate("/forgotpassword")}}>Forgot password</button>
     </div>
     <div>
     <button className={classes.signupbutton}  type="button"
      onClick={switchhandler}
     > {isLogin?"Dont have an account? signup":"Have an account? login"}</button>
     </div>
</div>}
       {isLoggedin && <ExpenseForm />}  


 </div>


  )
}
export default Authform

*/
