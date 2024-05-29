import {createSlice} from "@reduxjs/toolkit"

const initialthemestate={darkmode:false}

const themeslice=createSlice({
    name:"theme",
    initialState:initialthemestate,
    reducers:{
        toggletheme(state){
            state.darkmode=!state.darkmode
        }
    }
})
export const themeActions=themeslice.actions;
 export default themeslice.reducer;