"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStateContext } from '@/context/StateProvider';
import { Plus } from 'lucide-react'; // Import the icon
import { ArrowRight } from 'lucide-react'; // Import the new icon
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

const AddTaskForm: React.FC = () => {
    const { actions } = useStateContext();
    const [taskName, setTaskName] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Existing state for form hover
    const [isIconHovered, setIsIconHovered] = useState(false); // New state for icon hover

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        console.log('Form submitted'); // Debugging statement
        if (taskName.trim() === '') return;

        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            completed: false,
        };

        actions.addTask(newTask);
        setTaskName('');
        setIsIconHovered(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent blur event
    };

    return (
        <div id="wrapper" style={{ padding: '4px' }}>
            <form 
                onSubmit={handleSubmit} 
                className={`flex items-center space-x-2 pr-2 py-2 border-2 rounded-md ${isFocused ? 'border-blue-500' : 'border-transparent'} ${isHovered && !isFocused ? 'bg-gray-100' : ''}`}
                style={{ paddingLeft: '1.125rem' }}
                onMouseEnter={() => setIsHovered(true)} // Set hover state
                onMouseLeave={() => setIsHovered(false)} // Unset hover state
                onFocus={() => setIsFocused(true)} // Set focus state
                onBlur={() => setIsFocused(false)} // Unset focus state
            >
                <motion.div 
                    id="add-circle" 
                    className="w-5 h-5 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center transform scale-90"
                    initial={{ scale: 0.9, rotate: 0 }}
                    animate={isHovered && !isFocused ? { scale: 1, rotate: 0 } : isFocused ? { scale: 1, rotate: 180, backgroundColor: 'rgb(59 130 246)', borderColor: 'rgb(59 130 246)' } : { scale: 0.9, rotate: 0 }}
                    transition={isHovered && !isFocused ? { duration: 0.1 } : isFocused ? { duration: 0.2 } : { duration: 0, rotate: { duration: 0 } }}
                >
                    <Plus strokeWidth={3} size={12} className={isFocused ? "text-white" : "text-gray-300"} />
                </motion.div>          
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Add a todo"
                    className={`flex-1 border-none outline-none bg-transparent ${isFocused ? 'cursor-text' : 'cursor-pointer'}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {taskName && isFocused && (
                    <motion.span
                        className="flex items-center space-x-1 text-gray-400 text-sm mr-2 relative"
                        initial={{ x: -8, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.2 }}
                    >
                        <AnimatePresence>
                            {!isIconHovered && (
                                <motion.span
                                    className="pr-1"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0, exit: { duration: 0 } }}
                                    key="enter"
                                >
                                    Enter
                                </motion.span>
                            )}
                            {isIconHovered && (
                                <motion.span
                                    className="pr-1 text-blue-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0, exit: { duration: 0 } }}
                                    key="add-todo"
                                >
                                    Add todo
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <div 
                            className="w-5 h-5 rounded-sm bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-500"
                            onMouseDown={handleMouseDown} // Prevent blur event
                            onClick={() => handleSubmit()} // Add onClick handler
                            onMouseEnter={() => setIsIconHovered(true)} // Set icon hover state
                            onMouseLeave={() => setIsIconHovered(false)} // Unset icon hover state
                        >
                            <ArrowRight strokeWidth={3} size={16} className="text-white" />
                        </div>
                    </motion.span>
                )}
            </form>
        </div>
    );
};

export default AddTaskForm;
