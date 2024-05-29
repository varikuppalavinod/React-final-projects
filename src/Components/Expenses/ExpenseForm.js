
import { useState, useEffect} from 'react';
import classes from './ExpenseForm.module.css';
import { database, ref, push, onValue, remove, update } from '../Firebase'; // Ensure correct import paths
import {expenseActions} from "../Store/expense"
import{useDispatch,useSelector} from "react-redux"
import {themeActions} from "../Store/theme";


const ExpenseForm = () => {
    const dispatch=useDispatch()
    const expenses=useSelector(state=>state.expense.expensereduxdata)
    const darkmode=useSelector(state=>state.theme.darkmode)
    
    //console.log(" this is theme",darkmode)
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const[ispremiumactivated,setispremiumactivated]=useState(false)
   
    //get the data 
    useEffect(() => {
        const expensesRef = ref(database, 'expensetracker');
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedExpenses = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
              
              dispatch(expenseActions.updateexpense(loadedExpenses))
            } else {
            
              dispatch(expenseActions.updateexpense([]))

            }
        });
    }, []);
 
    
    //post the data
    const submitHandler = (event) => {
        event.preventDefault();
        const newExpense = {
            amount,
            description,
            category,
        };

        if (editMode) {
            // Update existing expense
            const expenseRef = ref(database, `expensetracker/${editId}`);
            update(expenseRef, newExpense)
                .then(() => {
                    setEditMode(false);
                    setEditId(null);
                    console.log('Expense updated');
                })
                .catch((error) => {
                    console.error('Error updating expense:', error);
                });
        } else {
            // Add new expense
            push(ref(database, 'expensetracker'), newExpense)
                .then(() => {
                    console.log('Expense added');
                })
                .catch((error) => {
                    console.error('Error adding expense:', error);
                });
        }

        setAmount('');
        setDescription('');
        setCategory('');
    };

    const deleteHandler = (id) => {
        const expenseRef = ref(database, `expensetracker/${id}`);
        remove(expenseRef)
            .then(() => {
                console.log('Expense deleted');
            })
            .catch((error) => {
                console.error('Error deleting expense:', error);
            });
    };

    const editHandler = (expense) => {
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setEditMode(true);
        setEditId(expense.id);
    };

      const totalamount=expenses.reduce((total,expense)=>{
          return total+parseFloat(expense.amount);
       },0)

       const togglethemehandler=()=>{
        
         dispatch(themeActions.toggletheme());
         setispremiumactivated(true);
       }
      
       const downloadCSVHandler = () => {
        const csvData = expenses.map(expense => ({
            Amount: expense.amount,
            Description: expense.description,
            Category: expense.category
        }));
        
        const csvContent = "Amount,Description,Category\n" 
            + csvData.map(item => `${item.Amount},${item.Description},${item.Category}`).join("\n");

        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(csvBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);    
    };

       
    return (
        <div className={darkmode? classes.dark: classes.light}>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="money">Money</label>
                        <input
                            type="number"
                            id="money"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Select Category</option>
                            <option>Food</option>
                            <option>Petrol</option>
                            <option>Salary</option>
                        </select>
                        <br /><br />
                        <button type="submit">{editMode ? 'Update Expense' : 'Add Expense'}</button>
                    </div>
                </form>
            </div>
            
            <div className={classes.addedexpense}>
            <h3>Added Expenses</h3>
            <br></br><br></br><br></br>
                <ul className={classes.expenses}>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.amount} - {expense.description} - {expense.category}
                            <button onClick={() => editHandler(expense)}>Edit</button>
                            <button onClick={() => deleteHandler(expense.id)}>Delete</button>
                        </li>
                        
                    ))}
                </ul>
                
                <h2>Total Cost: ${totalamount} </h2>
                {totalamount>10000 && (
               !ispremiumactivated ?(<button className={classes.premium}
                onClick={togglethemehandler}>Activate Premium</button>):
            (<button className={classes.premium}
             onClick={downloadCSVHandler}>download</button>))}
                
            </div>
        </div>
    );
};

export default ExpenseForm;





/*
import { useState, useEffect } from 'react';
import classes from './ExpenseForm.module.css';
import  {database,push,ref,onValue}  from '../Firebase'; // Ensure correct import paths

const ExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
      
      //Get method using firebase get th data
    useEffect(() => {
      const expensesRef = ref(database, 'expensetracker');
      onValue(expensesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              const loadedExpenses = Object.entries(data).map(([key, value]) => ({
                  id: key,
                  ...value,
              }));
              setExpenses(loadedExpenses);
          } else {
              setExpenses([]);
          }
      });
  }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        const newExpense = {
            amount,
            description,
            category,
        };
        // post the data to firebase
        push(ref(database, 'expensetracker'), newExpense, (err) => {
            if (err) {
                console.log(err);
            }
        });
        
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <div>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="money">Money</label>
                        <input
                            type="number"
                            id="money"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Select Category</option>
                            <option>Food</option>
                            <option>Petrol</option>
                            <option>Salary</option>
                        </select>
                        <br /><br />
                        <button type="submit">Add Expense</button>
                    </div>
                </form>
            </div>
            <div className={classes.addedexpense}>
            <h3>Added Expenses</h3>
            <ul className={classes.expenses}>
            {expenses.map((expense) => (
            <li key={expense.id}>
             {expense.amount} - {expense.description} - {expense.category}
               -<button>Edit</button> 
                -<button>Delete</button>
                </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseForm;




/*
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
      firebaseDB.child("expensetracker").push(
        newexpenses,
      err=>{
        if(err){
          console.log(err)
        }
      })
     
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
   <ul className={classes.expenses}>
    {expenses.map((expense)=>(
        <li key={expense.id}>
       {expense.amount}-{expense.description}-{expense.category}
       -<button>Edit</button>-<button>Delete</button>
        </li>
    ))}
   </ul>
   </div>
    </div>
 )
}
export default ExpenseForm

*/
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



import { useState, useEffect } from 'react';
import classes from './ExpenseForm.module.css';
import { database, ref, push, onValue, remove, update } from '../Firebase'; // Ensure correct import paths
import { expenseActions } from "../Store/expense";
import { themeActions } from "../Store/theme";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from 'file-saver';
import { CSVLink } from "react-csv";

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expense.expensereduxdata);
    const darkMode = useSelector(state => state.theme.darkMode);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Get the data 
    useEffect(() => {
        const expensesRef = ref(database, 'expensetracker');
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedExpenses = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                dispatch(expenseActions.updateexpense(loadedExpenses));
            } else {
                dispatch(expenseActions.updateexpense([]));
            }
        });
    }, [dispatch]);

    // Post the data
    const submitHandler = (event) => {
        event.preventDefault();
        const newExpense = {
            amount,
            description,
            category,
        };

        if (editMode) {
            // Update existing expense
            const expenseRef = ref(database, `expensetracker/${editId}`);
            update(expenseRef, newExpense)
                .then(() => {
                    setEditMode(false);
                    setEditId(null);
                    console.log('Expense updated');
                })
                .catch((error) => {
                    console.error('Error updating expense:', error);
                });
        } else {
            // Add new expense
            push(ref(database, 'expensetracker'), newExpense)
                .then(() => {
                    console.log('Expense added');
                })
                .catch((error) => {
                    console.error('Error adding expense:', error);
                });
        }

        setAmount('');
        setDescription('');
        setCategory('');
    };

    const deleteHandler = (id) => {
        const expenseRef = ref(database, `expensetracker/${id}`);
        remove(expenseRef)
            .then(() => {
                console.log('Expense deleted');
            })
            .catch((error) => {
                console.error('Error deleting expense:', error);
            });
    };

    const editHandler = (expense) => {
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setEditMode(true);
        setEditId(expense.id);
    };

    const totalAmount = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.amount);
    }, 0);

    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme());
    };

    const downloadCSVHandler = () => {
        const csvData = expenses.map(expense => ({
            Amount: expense.amount,
            Description: expense.description,
            Category: expense.category
        }));
        const csvBlob = new Blob([csvData.map(e => Object.values(e).join(",")).join("\n")], { type: "text/plain" });
        saveAs(csvBlob, 'expenses.csv');
    };

    return (
        <div className={darkMode ? classes.dark : classes.light}>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="money">Money</label>
                        <input
                            type="number"
                            id="money"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <br /><br />
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Select Category</option>
                            <option>Food</option>
                            <option>Petrol</option>
                            <option>Salary</option>
                        </select>
                        <br /><br />
                        <button type="submit">{editMode ? 'Update Expense' : 'Add Expense'}</button>
                    </div>
                </form>
            </div>

            <div className={classes.addedexpense}>
                <h3>Added Expenses</h3>
                <br /><br /><br />
                <ul className={classes.expenses}>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.amount} - {expense.description} - {expense.category}
                            <button onClick={() => editHandler(expense)}>Edit</button>
                            <button onClick={() => deleteHandler(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                <h2>Total Cost: ₹{totalAmount}</h2>
                {totalAmount > 10000 && (
                    <>
                        <button className={classes.premium} onClick={toggleThemeHandler}>Activate Premium</button>
                        <button className={classes.download} onClick={downloadCSVHandler}>Download CSV</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ExpenseForm;
*/