import {useContext} from "react"
import classes from "./Header.module.css"
import authcontext from "../Store/Authcontext"
import{useNavigate} from "react-router-dom"
const Header =()=>{

    const navigate=useNavigate();

    const authctx=useContext(authcontext)
    const isloggedin=authctx.isLoggedIn
    console.log(isloggedin)

    const logouthandler=()=>{
        authctx.logout()
        navigate("/")  //redirect to login page
        console.log(authctx)
    }
 return(
    <div className={classes.header}>
        <div>
        <h1>Expense Tracker</h1>
        </div>
        <div>
        <button onClick={logouthandler}>{isloggedin?"Logout":"Login"}</button>
        </div>
    </div>
 )
}
export default Header