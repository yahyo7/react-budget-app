import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { dispatch, currency } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency,
        });
    };

    return (
        <div className='alert alert-primary'>
            <label htmlFor="currency">Select Currency:</label>
            <select id="currency"  value={currency} onChange={handleCurrencyChange}>
                <option value="£">British Pound (£)</option>
                <option value="$">US Dollar ($)</option>
                <option value="€">Euro (€)</option>
                <option value='₹'>₹Ruppee (₹)</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
