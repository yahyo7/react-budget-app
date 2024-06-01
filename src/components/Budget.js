import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext); // Get setBudget from context
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value, 10); // Parse as integer (base 10)
    setNewBudget(value);
    setBudget(value); // Update context value
  };

  return (
    <div className="alert alert-secondary">
      <span>Budget: £{budget}</span>
      <input
        type="number"
        step="10"
        value={newBudget}
        onChange={handleBudgetChange}
        min={0} // Ensure non-negative budget
      />
    </div>
  );
};

export default Budget;
