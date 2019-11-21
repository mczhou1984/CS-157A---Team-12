import React, { useState } from 'react';
import { StyledLogin } from '../login/login.styled.js';

const FORM_TYPES = {
    INCOME: 'INCOME_FORM',
    EXPENSES: 'EXPENSES_FORM',
    SAVINGS: 'SAVINGS_FORM',
}

const READABLE_FORM_NAMES = {
    [FORM_TYPES.INCOME]: 'Income',
    [FORM_TYPES.EXPENSES]: 'Expenses',
    [FORM_TYPES.SAVINGS]: 'Savings',
}

export default function() {
    const [currentFormType, setFormType] = useState(null)
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')

    function onBackClick() {
        setFormType(null)
        setAmount('')
        setType('')
    }

    if (!currentFormType) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 30 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 500, height: 100 }}>
                    <button onClick={() => setFormType(FORM_TYPES.INCOME)} >Income</button>
                    <button onClick={() => setFormType(FORM_TYPES.EXPENSES)} >Expenses</button>
                    <button onClick={() => setFormType(FORM_TYPES.SAVINGS)} >Savings</button>
                </div>
            </div>
        )
    }
    return (
        <StyledLogin>
            <div style={{ maxWidth: 600, margin: 'auto', padding: 10, display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 500, marginTop: 30, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button className="btn btn-primary" style={{width: 200}} onClick={onBackClick}>Back</button>
                        <h1>{READABLE_FORM_NAMES[currentFormType]}</h1>
                    </div>
                    {
                        currentFormType !== FORM_TYPES.SAVINGS &&
                        <input type="number" className="form-control mr-sm-2" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Insert a type" />
                    }
                    <input type="number" className="form-control mr-sm-2" value={type} onChange={(e) => setType(e.target.value)} placeholder="Insert an amount" />
                    <button className="btn btn-primary" style={{width: 200}} onClick={onBackClick}>Submit</button>
                </div>
            </div>
        </StyledLogin>
    )
}