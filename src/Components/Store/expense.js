import {createSlice} from "@reduxjs/toolkit";

const intialexpensestate={expensereduxdata:[]}

const expenseSlice=createSlice({
    name:"expense",
    initialState:intialexpensestate,
    reducers:{
        updateexpense(state,action){
      state.expensereduxdata=action.payload
      console.log(state.expensereduxdata)
        }
    }
})

export const expenseActions=expenseSlice.actions;
export default expenseSlice.reducer;