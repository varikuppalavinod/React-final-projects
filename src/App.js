import Authform from "./Components/Login/Authform"
import {BrowserRouter,Routes,Route} from "react-router-dom"
//import Welcomepage from "./Components/UI/Welcomepage"
//import Updateprofilepage from "./Components/Updateprofile/Updateprofilepage"
import Header from "./Components/Header/Header"
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword"

//import {authActions} from "./Components/Store/auth"
//import{useSelector} from "react-redux"

const App=()=>{
 // const isLoggedin=useSelector(state=>state.auth.isLoggedin)
 return(
  <div>
   
  <BrowserRouter>
  <Header/>
  <Routes>
  
   &&<Route path="/" element={<Authform/>}/>
   
   <Route path="/forgotpassword" element={<Forgotpassword/>}/>
   <Route path="*" element={<Authform/>}/>
   
    </Routes>
  </BrowserRouter>
  </div>
 )
}
export default App