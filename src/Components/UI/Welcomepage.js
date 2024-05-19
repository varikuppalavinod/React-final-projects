
import {useNavigate} from "react-router-dom"
import classes from "./Welcomepage.module.css"
const Welcomepage=()=>{

    const navigate=useNavigate()

    const clickinghandler=()=>{
      navigate("/updateprofilepage")
    }
 return(
    <div className={classes.page}>
        <div>
        <p>Welcome to expensetracker</p>
        </div>
        <div className={classes.pageprofile}>
        <p>your profile is incomplete.<button onClick={clickinghandler}>complete now</button>  </p>
            </div>
    </div>
 )
}
export default Welcomepage