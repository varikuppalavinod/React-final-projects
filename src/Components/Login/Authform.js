
import {useContext} from "react"
import {useRef,useState} from "react"
import classes from "./Authform.module.css"
import {useNavigate} from "react-router-dom"
import Cartcontext from "../Store/Authcontext" 

const Authform=()=>{
  const cartctx=useContext(Cartcontext)
 console.log("this is authform",cartctx)

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
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY"
    }else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY";
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
      
      cartctx.login(data.idToken)
      
      navigate("/welcome")
     
      console.log(data)
      console.log("use has successfully signed up")
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return(
    <form onSubmit={submithandler}>
    <div className={classes.authform}>
        <div><h1>{isLogin?"Login":"Sign Up"}</h1></div>
        <div>
        <input type="email" placeholder="email" ref={inputemail}/>
        <br></br><br></br>
        <input type="password" placeholder="password" ref={inputpassword}/>
        <br></br><br></br>
        <input type="password" placeholder="conformpassword"ref={inputconformpassword} />
        </div> <br></br><br></br>
        <button>{isLogin?"Login":"Sign up"}</button>
        <br></br><br></br>
        <button>Forgot password</button>
        </div>
        <button className={classes.button}  type="button"
         onClick={switchhandler}
        > {isLogin?"Have an account? login":"Dont have an account? signup"}</button>
    </form>
  )
}
export default Authform


/*

import { useRef } from "react";
import classes from "./Authform.module.css";

const Authform = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;
    const enteredConfirmPassword = inputConfirmPassword.current.value;

    // Basic validation
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log("token", data.idToken);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.authform}>
        <div>
          <h1>Sign Up</h1>
        </div>
        <div>
          <input type="email" placeholder="Email" ref={inputEmail} required />
          <br />
          <br />
          <input type="password" placeholder="Password" ref={inputPassword} required />
          <br />
          <br />
          <input type="password" placeholder="Confirm Password" ref={inputConfirmPassword} required />
        </div>
        <br />
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <br />
      </div>
    </form>
  );
};

export default Authform;
*/