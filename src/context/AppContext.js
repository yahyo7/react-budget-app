import React, { createContext, useReducer, useEffect, useState } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
   
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if (total_budget <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        return { ...currentExp, cost: action.payload.cost + currentExp.cost };
                    } else {
                        return currentExp;
                    }
                });

                return {
                    ...state,
                    expenses: updatedExpenses
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
            case 'RED_EXPENSE':
            const newBudget = state.budget + action.payload.cost;
            const red_expenses = state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost =  currentExp.cost - action.payload.cost;
                }
                return currentExp
            })
            return {
                ...state,
                expenses: [...red_expenses],
                budget: newBudget // Update the budget property
            };
                case 'DELETE_EXPENSE':
                    const updatedExpenses = state.expenses.filter(
                        (currentExp) => currentExp.name !== action.payload
                    );
                    const budget = state.budget + state.expenses.find(
                        (expense) => expense.name === action.payload
                    ).cost;
                    return {
                        ...state,
                        expenses: updatedExpenses,
                        budget: budget // Return the updated budget
                    };
                
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
                budget: budget
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 3000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Calculate remaining inside useEffect
    const [remaining, setRemaining] = useState(state.budget - totalExpenses(state.expenses));

    useEffect(() => {
        setRemaining(state.budget - totalExpenses(state.expenses));
    }, [state]); // Run effect whenever 'state' changes

    function totalExpenses(expenses) {
        return expenses.reduce((total, item) => total + item.cost, 0);
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining, 
                dispatch,
                currency: state.currency,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};


