import{createSlice} from "@reduxjs/toolkit"

const initialauthstate={token:"",isLoggedin:"false"}

const authSlice=createSlice({
    name:"auth",
    initialState:initialauthstate,
    reducers:{
        login(state,action){
            state.token=action.payload;
            state.isLoggedin=true;
            console.log("this is redux",state.token)
        },
        logout(state){
        state.token="";
           state.isLoggedin=false
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;

