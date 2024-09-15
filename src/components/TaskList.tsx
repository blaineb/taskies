"use client";

import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/StateProvider';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpAZ, ArrowDownZA } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TaskList: React.FC = () => {
    const { state } = useStateContext();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        setInitialLoad(false);
    }, []);

    const sortedTasks = [...state.tasks].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row justify-between items-center pl-6 pr-4 py-4 border-b">
                <CardTitle>Todos</CardTitle>
            </CardHeader>
            <div className="flex flex-col overflow-hidden">
                <AddTaskForm />
                <AnimatePresence>
                    {sortedTasks.map(task => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: initialLoad ? 1 : 0, height: initialLoad ? 'auto' : 0, transformOrigin: 'center' }}
                            animate={{ opacity: 1, height: 'auto', transformOrigin: 'center', transition: { type: "spring", bounce: .3, duration: .5 } }}
                            exit={{ opacity: 0, height: 0, transformOrigin: 'center', transition: { ease: "backOut", duration: 0.3 } }}
                        >
                            <TaskItem id={task.id} name={task.name} completed={task.completed} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </Card>
    );
};

export default TaskList;
