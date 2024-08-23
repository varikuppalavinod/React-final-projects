
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
    const premium=useSelector((state)=>state.theme.premium)
    
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
         //setispremiumactivated(true);
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

       if(totalamount<1000){
         dispatch(themeActions.darkmodeof())
         //setispremiumactivated(null)
       }
    return (
        <div className={darkmode? classes.dark: classes.light} style={{display:"flex",alignItems:"center",gap:"2rem",flexDirection:"row",top:"7rem",

            position:"relative",margin:"auto"
        }}>
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
                <ul  className={classes.expenses}>
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
               !premium ?(<button className={classes.premium}
                onClick={togglethemehandler}>Activate Premium</button>):
            (<button className={classes.premium}
             onClick={downloadCSVHandler}>download</button>))}
                
            </div>
        </div>
    );
};

export default ExpenseForm;



