import React from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'


const ExpenseItem = ({ 
    expense, 
    edit,
    handleEdit,
    handleDelete,
    }) => {
    const { id, charge, amount} = expense || {}
    return (
        <li className = {edit ? "item-chosen" : "item"}>
            <div className='info'>
                <span className='expense'>
                    {charge}
                </span>
                <span className='amount'>
                    ${amount}
                </span>
            </div>
            <div>
                <button 
                    className='edit-btn' 
                    aria-label='edit button' 
                    onClick={() => {handleEdit(id)}}
                >
                    <FaRegEdit/>
                </button>
                <button 
                    className='clear-btn' 
                    aria-label='delete button' 
                    onClick={() => {handleDelete(id)}}
                >
                    <FaRegTrashAlt/>
                </button>
            </div>
        </li>
    )
}

export default ExpenseItem
