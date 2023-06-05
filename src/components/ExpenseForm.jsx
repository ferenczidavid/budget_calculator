import React from 'react'
import { TbSend } from 'react-icons/tb'

const ExpenseForm = ({ 
    charge, 
    amount, 
    handleCharge, 
    handleAmount, 
    handleSubmit,
    edit
    }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor="charge">charge</label>
                    <input 
                    type="text" 
                    className='form-control' 
                    id='charge' 
                    name='charge' 
                    placeholder='Name of expense'
                    value={charge}
                    onChange={handleCharge}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="amount">amount</label>
                    <input 
                    type="number" 
                    className='form-control' 
                    id='amount' 
                    name='amount' 
                    placeholder='Amount of expense ($)'
                    value={amount}
                    onChange={handleAmount}
                    required
                    />
                </div>
            </div>
            <button 
            type='submit' 
            className='btn'
            >
                {edit ? 'edit' : 'submit'}
                <TbSend className='btn-icon'/> 
            </button>
        </form>
    )
}

export default ExpenseForm