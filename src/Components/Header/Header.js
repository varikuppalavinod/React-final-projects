
import classes from "./Header.module.css"
import{useNavigate} from "react-router-dom"

import {authActions} from "../Store/auth"
import{useSelector,useDispatch} from "react-redux"
import ExpenseForm from "../Expenses/ExpenseForm"

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
    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
    <div className={classes.header}>
        <h1>Expense Tracker</h1>
        <button onClick={logouthandler}>{isLoggedin?"Logout":"Login"}</button>
        </div>
        {isLoggedin && <ExpenseForm />}  
        </div>
    
 )
}
export default Header