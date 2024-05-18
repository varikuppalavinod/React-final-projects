import Authform from "./Components/Authform/Authform"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Welcomepage from "./Components/UI/Welcomepage"

const App=()=>{
 return(
  <BrowserRouter>
  <Routes>
   <Route path="/" element={<Authform/>}/>
   <Route path="/welcome" element={<Welcomepage/>}/>
    </Routes>
  </BrowserRouter>
 )
}
export default App