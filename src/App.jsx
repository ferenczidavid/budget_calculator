import React, { useState, useTransition, useEffect } from 'react'
import './App.css'
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import { v4 as uuidv4 } from 'uuid'; 

const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
  //----------------------state values---------------------
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  //single expense
  const [charge, setCharge] = useState('');

  //single amount
  const [amount, setAmount] = useState('');

  //alert
  const [alert, setAlert] = useState({show:false});

  //edit
  const [edit, setEdit] = useState(false);

  //edit item
  const [selectedId, setSelectedId] = useState(0);

  //----------------------useEffect---------------------
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  },[expenses])

  //----------------------functionality---------------------
  const handleCharge = (e) => {
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleAlert = ({type,text}) => {
    setAlert({show:true,type,text});
    setTimeout(() => {
      setAlert({type:false})
    },2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== "" && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id ===selectedId ? {...item,charge,amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type:"success",text:"item successfully edited"});
      }else{
        const singleExpense = 
        {
          id: uuidv4(),
          charge,
          amount,
        }
        setExpenses([...expenses, singleExpense])
        handleAlert({ type:"success",text:"item added"});
      }  
      setCharge("");
      setAmount("");
    }else{
      handleAlert({ 
        type:"danger",
        text:`charge can't be empty value and amount value has to be bigger than zero!`
      })
    }
  }

  const handleClearAll = () => {
    setExpenses([]);
    handleAlert({type:'danger', text:"all item deleted"});
  }

  const handleDelete = (id) => {
    let filteredArray = expenses.filter(item => item.id !== id);
    setExpenses(filteredArray);
    handleAlert({type:'danger', text:"item deleted"});
  }

  const handleEdit = (id) => {
    let expense = expenses.find((item => item.id === id))
    //let {charge, amount} = expense;
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setSelectedId(id);
    console.log(edit);
  }
  
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert/>
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm 
          charge={charge} 
          amount={amount} 
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
          expenses={expenses} 
          handleClearAll={handleClearAll}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          selectedId = {selectedId}
        />
      </main> 
      <h1>
        total spending: {" "}
        <span className='total'>
          ${expenses.reduce((accumulator,currentValue) => {
            return accumulator += parseInt(currentValue.amount);
          },0)}
        </span>
      </h1>
      
    </>
  )
}

export default App
