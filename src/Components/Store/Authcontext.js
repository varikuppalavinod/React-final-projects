
import React,{useState} from "react";

const Authcontext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}

})

export const Authcontextprovider=(props)=>{
   const[token,setToken]=useState(null)

   const userIsLoggedIn=!!token;

   const loginHandler=(token)=>{
    console.log(token)
    setToken(token)
   }

   const logoutHandler=()=>{
    setToken(null)
   }

   const contextvalue={
     token:token,
     isLoggedIn:userIsLoggedIn,
     login:loginHandler,
     logout:logoutHandler,
   }

    return <Authcontext.Provider value={contextvalue}>
        {props.children}</Authcontext.Provider>
}

export default Authcontext

/*
import React,{useState} from "react"

const Authcontext =React.createContext({
    token:"",
    login:(token)=>{},
    logout:()=>{},
})

export const Authcontextprovider=(props)=>{
  const[token,setToken]=useState(null)

  const loginhandler=(token)=>{
    setToken(token)
  }

  const logouthandler=()=>{}
  

    const contextvalue={
        token:token,
        login:loginhandler,
        logout:logouthandler,
    }
    return <Authcontext.Provider value={contextvalue}>
        {props.children}
    </Authcontext.Provider>
}
export default Authcontext
*/