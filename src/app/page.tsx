import React from 'react';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import ModeToggle from '@/components/ModeToggle';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-24 bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-10 right-10">
        <ModeToggle />
      </div>
      <div className="w-full max-w-2xl">
        <TaskList />
      </div>
    </main>
  );
}
