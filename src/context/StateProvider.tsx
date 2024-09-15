"use client";

import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the shape of a task
interface Task {
    id: string;
    name: string;
    completed: boolean;
    createdAt: string; // Add createdAt property
}

// Define the shape of the state
interface State {
    tasks: Task[];
}

// Define the shape of actions
type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_TASKS'; payload: Task[] }; // Add this line

// Initial state
const initialState: State = {
    tasks: [
        { id: '1', name: 'Thank Ben', completed: false, createdAt: new Date().toISOString() },
        { id: '2', name: 'Call mom about the situation with the guy and the place in Belize', completed: false, createdAt: new Date().toISOString() }
    ]
};

// Reducer function to manage state changes
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload }; // Add this case
        default:
            return state;
    }
};

// Create context
interface StateContextProps {
    state: State;
    actions: {
        addTask: (task: Task) => void;
        toggleTask: (taskId: string) => void;
        deleteTask: (taskId: string) => void;
        setTasks: (tasks: Task[]) => void; // Add this line
    };
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

// StateProvider component
export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Actions
    const addTask = (task: Task) => {
        dispatch({ type: 'ADD_TASK', payload: { ...task, createdAt: new Date().toISOString() } });
    };

    const toggleTask = (taskId: string) => {
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    };

    const deleteTask = (taskId: string) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    };

    const setTasks = (tasks: Task[]) => {
        dispatch({ type: 'SET_TASKS', payload: tasks });
    };

    return (
        <StateContext.Provider value={{ state, actions: { addTask, toggleTask, deleteTask, setTasks } }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the state context
export const useStateContext = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};