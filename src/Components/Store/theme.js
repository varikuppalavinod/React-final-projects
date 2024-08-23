import {createSlice} from "@reduxjs/toolkit"

const initialthemestate={darkmode:false,premium:"false"}

const themeslice=createSlice({
    name:"theme",
    initialState:initialthemestate,
    reducers:{
        toggletheme(state){
            state.darkmode=!state.darkmode
            state.premium=true
        },
        darkmodeof(state){
            state.darkmode=false
            state.premium=null
        }

    }
})
export const themeActions=themeslice.actions;
 export default themeslice.reducer;