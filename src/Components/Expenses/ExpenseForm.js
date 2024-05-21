import classes from "./ExpenseForm.module.css"
import {useState} from "react"


const ExpenseForm=()=>{

    const[amount,setamount]=useState("")
    const[description,setdescription]=useState("")
    const[category,setcategory]=useState("")
    const[expenses,setexpenses]=useState([])


    const submithandler=(event)=>{
      event.preventDefault()
      const newexpenses={
        id:Math.random(),
        amount:amount,
        description:description,
        category:category,
      }
     
      //console.log(newexpenses)
       setexpenses((prevstate)=>[...prevstate,newexpenses])
       setamount("");
       setdescription("");
       setcategory("");

    }
  
   // console.log(expenses)

 return(
    <div>
    <div className={classes.form}>
         <form onSubmit={submithandler}>
        <div>
            <label htmlFor="money">Money</label>
            <input type="number" id="money" value={amount}
            onChange={(e)=>{setamount(e.target.value)}}/>
        </div>
        <br></br><br></br>
        <div>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description}
            onChange={(e)=>{setdescription(e.target.value)}}/>
        </div>
        <br></br><br></br>
        <div>
            <label htmlFor="category">Category</label>
            <select value={category} onChange={(e)=>{setcategory(e.target.value)}}>
                <option>Select Category</option>
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
            </select> <br></br><br></br>
            <button type="submit">Add Expense</button>
        </div>
      </form>

    </div>
    <div className={classes.addedexpense}>
   <h3> added expenses</h3>
   <ul>
    {expenses.map((expense)=>(
        <li key={expense.id}>
       {expense.amount}-{expense.description}-{expense.category}
        </li>
    ))}
   </ul>
   </div>
    </div>
 )
}
export default ExpenseForm


/*
import { useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const newExpense = {
      id: Math.random().toString(),
      amount,
      description,
      category
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className={classes.expenseForm}>
      <h2>Add New Expense</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.amount} - {expense.description} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseForm;
*/