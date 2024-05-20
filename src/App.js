import Authform from "./Components/Login/Authform"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Welcomepage from "./Components/UI/Welcomepage"
import Updateprofilepage from "./Components/Updateprofile/Updateprofilepage"
import Header from "./Components/Header/Header"
import {useContext} from "react"
import authcontext from "./Components/Store/Authcontext"

const App=()=>{

  const authctx=useContext(authcontext)
  const isloggedin=authctx.isLoggedIn
 return(
  <div>
   
  <BrowserRouter>
  <Header/>
  <Routes>
  
   &&<Route path="/" element={<Authform/>}/>
   {isloggedin && <Route path="/welcome" element={<Welcomepage/>}></Route>}
   {isloggedin && <Route path="/updateprofilepage" element={<Updateprofilepage/>}/>}
   <Route path="*" element={<Authform/>}/>
   
    </Routes>
  </BrowserRouter>
  </div>
 )
}
export default App