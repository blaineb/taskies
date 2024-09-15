"use client";

import React from 'react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox-bb';
import { Button } from '@/components/ui/button';
import { useStateContext } from '@/context/StateProvider';
import { GripVertical, Trash2 } from 'lucide-react';
import { motion, backInOut, backIn, backOut, circIn, circOut } from 'framer-motion'


interface TaskItemProps {
    id: string;
    name: string;
    completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, name, completed }) => {
    const { actions } = useStateContext();
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = () => { actions.toggleTask(id);};

    const handleDelete = () => { actions.deleteTask(id); };

    return (
        <motion.div
            className="p-1 pt-0 overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, padding: 0, margin: 0, transformOrigin: 'center', transition: { ease: "backOut", duration: 0.3 } }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex items-start justify-between pl-1 pr-3 py-1 hover:bg-gray-100 group rounded-md overflow-hidden">
                <div className="flex items-start py-0.5 flex-shrink">  {/* Wrapper to group the elements together while making the text element not grow so the cross-off line won't go all the way across. */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="cursor-move mt-1">
                        <GripVertical size={16} className="cursor-grab invisible group-hover:visible hover:text-gray-500 text-gray-300" />
                    </motion.div>
                    <div className="w-5 h-5 flex items-center justify-center" onClick={handleToggle}>
                        <motion.div 
                            initial={{ scale: .8 }}
                            animate={{ scale: completed ? [1.1, 1] : [.8, .9] }}
                            transition={{ duration: .2 }}
                            className={`mt-1 w-5 h-5 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center cursor-pointer ${completed ? 'bg-green-600 border-green-600' : ''}`}
                        >
                        {completed && (
                            <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ type: "spring", bounce: 0.35 }} d="M1.94999 6.16443L4.21799 9.45015L10.05 2.55015" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </motion.svg>
                        )}
                    </motion.div>
                    </div>
                        <motion.span 
                            className={`ml-2 relative cursor-pointer flex-shrink ${completed ? 'text-gray-400 text-overflow-ellipsis' : ''}`} 
                            onClick={handleToggle}
                            initial={{ height: 'auto' }}
                            animate={{ height: completed ? 24 : 'auto' }}
                            transition={{ type: "spring", duration: 0.2 }}
                        >
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: completed ? '98%' : 0 }}
                                transition={{ type: "ease", duration: completed ? 0.15 : 0 }}
                                className="absolute bg-gray-400 h-[1px] top-1/2 left-0"
                            />
                            {name}
                        </motion.span>
                </div>
                {/* <span>{id}</span>  */}
                <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8 }}>
                <Button variant="ghost" onClick={handleDelete} className="invisible group-hover:visible text-red-500 hover:text-red-700 p-0" style={{ width: '28px', height: '28px' }}>
                    <Trash2 size={16} /> {/* Use the Trash2 icon here */}
                </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
