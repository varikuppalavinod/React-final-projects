import Authform from "./Components/Login/Authform"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Welcomepage from "./Components/UI/Welcomepage"
import Updateprofilepage from "./Components/Updateprofile/Updateprofilepage"

const App=()=>{
 return(
  <BrowserRouter>
  <Routes>
   <Route path="/" element={<Authform/>}/>
   <Route path="/welcome" element={<Welcomepage/>}></Route>
   <Route path="/updateprofilepage" element={<Updateprofilepage/>}/>
   
    </Routes>
  </BrowserRouter>
 )
}
export default App