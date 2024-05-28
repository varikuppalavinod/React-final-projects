
import classes from "./Header.module.css"
import{useNavigate} from "react-router-dom"

import {authActions} from "../Store/auth"
import{useSelector,useDispatch} from "react-redux"
const Header =()=>{
   
        //redux
    const isLoggedin=useSelector(state=>state.auth.isLoggedin)
    const dispatch=useDispatch()

    const navigate=useNavigate();

    const logouthandler=()=>{
        dispatch(authActions.logout())
    
        navigate("/")  //redirect to login page
        
    }
 return(
    <div className={classes.header}>
        <div>
        <h1>Expense Tracker</h1>
        </div>
        <div>
        <button onClick={logouthandler}>{isLoggedin?"Logout":"Login"}</button>
        </div>
    </div>
 )
}
export default Header