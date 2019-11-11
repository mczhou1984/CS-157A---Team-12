import React, { useState } from 'react';

export default function() {
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')

    return (
        <div style={{ marginTop: '20px' }}>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Insert a type" />
            <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Insert an amount" />
        </div>
    )
}