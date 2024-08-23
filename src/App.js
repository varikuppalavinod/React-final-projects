import Authform from "./Components/Login/Authform"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./Components/Header/Header"
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword"


const App=()=>{
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