import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { expenses,currency, budget, dispatch } = useContext(AppContext); // Get dispatch from context
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState(''); // State to handle error message

    useEffect(() => {
        setNewBudget(budget);
    }, [budget]);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value, 10); // Parse as integer (base 10)
        const totalExpenses = expenses.reduce((total, item) => {
          return (total += item.cost);
        }, 0);
        
        if (value > 20000) {
            setError('Budget cannot exceed £20,000. Decrease the value'); // Set error message if budget exceeds 20,000
        } 
        else if (value < totalExpenses) {
          setError(`Budget cannot be lower than Spending: £${totalExpenses}. Increase the value`)
        }else {
            setError(''); // Clear error message if budget is valid
        }
        setNewBudget(value);
        dispatch({
          type: 'SET_BUDGET',
          payload: value,
        }); // Dispatch the action to update the budget
    };

    const alertType = error ? 'alert-danger' : 'alert-success'; // Determine alert type based on error state

    return (
        <div className={`alert ${alertType} alert-secondary`}>
            <span>Budget: {currency}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                min={0} // Ensure non-negative budget
            />
            {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Conditionally render error message */}
        </div>
    );
};

export default Budget;
