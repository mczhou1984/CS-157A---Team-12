import React, { useState } from 'react';

const FORM_TYPES = {
    INCOME: 'INCOME_FORM',
    BUDGET: 'BUDGET_FORM'
}

const READABLE_FORM_NAMES = {
    [FORM_TYPES.INCOME]: 'Income',
    [FORM_TYPES.Budget]: 'Budget',
}

export default function() {
    const [currentFormType, setFormType] = useState(null)
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [percent, setPercent] = useState('')

    if (!currentFormType) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 30 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 500, height: 100 }}>
                    <button onClick={() => setFormType(FORM_TYPES.INCOME)} >Income</button>
                    <button onClick={() => setFormType(FORM_TYPES.INCOME)} >Expenses</button>
                </div>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 500, marginTop: 30, margin: '0 auto' }}>
                <div>
                    <button style={{ width: 50 }} onClick={() => setFormType(null)}>Back</button>
                    <h1>{READABLE_FORM_NAMES[currentFormType]}</h1>
                </div>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Insert a type" />
                <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Insert an amount" />
                <input value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="Insert a percent saving" />
            </div>
        </div>
    )
}