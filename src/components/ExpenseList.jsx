import React from 'react'
import ExpenseItem from './ExpenseItem'
import { FaRegTrashAlt } from 'react-icons/fa'

const ExpenseList = ({
  expenses,
  /* handleEdit,
  handleDelete,
  edit */
  selectedId,
  handleClearAll,
  ...rest //spreads the rest of the props
  }) => {
  //const { edit } = rest; === edit, 
  return (
    <>
        <ul className='list'>
            {expenses.map(expense => {
                return (
                  <ExpenseItem 
                    key={expense.id} 
                    expense={expense}
                    edit={expense.id === selectedId}
                    /*handleDelete={handleDelete} 
                    handleEdit={handleEdit} */
                    {...rest}
                  />
                ) 
            })}
        </ul>
        {expenses.length > 0 && <button className='btn' onClick={handleClearAll}>Clear items <FaRegTrashAlt className='btn-icon'/></button>}
    </>
  )
}

export default ExpenseList