'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './tasks-columns';
import { Task } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTasks, createTask, updateTask, deleteTask, selectFilteredTasks, selectLoading, selectError } from '@/store/taskSlice';
import RightSidebar from './RightSidebar';
import NewLineModal from './NewLineModal';
import NewPriorityLineModal from './NewPriorityLineModal';
import NewDateLineModal from './NewDateLineModal';
import NewWorkBlockLineModal from './NewWorkBlockLineModal';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewLineModalOpen, setIsNewLineModalOpen] = useState(false);
  const [isNewPriorityLineModalOpen, setIsNewPriorityLineModalOpen] = useState(false);
  const [isNewDateLineModalOpen, setIsNewDateLineModalOpen] = useState(false);
  const [isNewWorkBlockLineModalOpen, setIsNewWorkBlockLineModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setIsRightSidebarOpen(true);
  };

  const handleCloseRightSidebar = () => {
    setIsRightSidebarOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    const toastId = toast.loading("Deleting task...");
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      handleCloseRightSidebar();
      toast.update(toastId, {
        render: "Task deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.update(toastId, {
        render: "Failed to delete task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleUpdateTask = async (task: Task) => {
    const toastId = toast.loading("Updating task...");
    try {
      await dispatch(updateTask(task)).unwrap();
      handleCloseRightSidebar();
      toast.update(toastId, {
        render: "Task updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.update(toastId, {
        render: "Failed to update task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleNewLineSave = async (line: string, tag: string) => {
    const toastId = toast.loading("Creating new task...");
    try {
      await dispatch(createTask({
        type: 'basic',
        line,
        tag,
      })).unwrap();
      setIsNewLineModalOpen(false);
      toast.update(toastId, {
        render: "Task created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.update(toastId, {
        render: "Failed to create task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleNewPriorityLineSave = async (line: string, tag: string, priority: string, status: "Completed" | "Not Completed" | "No Status") => {
    const toastId = toast.loading("Creating priority task...");
    try {
      await dispatch(createTask({
        type: 'priority',
        line,
        tag,
        priority,
        status,
      })).unwrap();
      setIsNewPriorityLineModalOpen(false);
      toast.update(toastId, {
        render: "Priority task created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to create priority task:', error);
      toast.update(toastId, {
        render: "Failed to create priority task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleNewDateLineSave = async (newTask: Partial<Task>) => {
    const toastId = toast.loading("Creating date task...");
    try {
      await dispatch(createTask({
        type: 'date',
        ...newTask,
      } as Task)).unwrap();
      setIsNewDateLineModalOpen(false);
      toast.update(toastId, {
        render: "Date task created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to create date task:', error);
      toast.update(toastId, {
        render: "Failed to create date task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleNewWorkBlockLineSave = async (name: string, tag: string, priority: string, endDate: string) => {
    const toastId = toast.loading("Creating work block task...");
    try {
      await dispatch(createTask({
        type: 'workblock',
        line: name,
        tag,
        priority,
        endDate,
      })).unwrap();
      setIsNewWorkBlockLineModalOpen(false);
      toast.update(toastId, {
        render: "Work block task created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to create work block task:', error);
      toast.update(toastId, {
        render: "Failed to create work block task",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>;
  }

  const formattedData = tasks.map(task => ({
    ...task,
    id: task.id,
  }));

  return (
    <div className="flex flex-col h-full p-4">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Managing App</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsNewLineModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Line
          </Button>
          <Button onClick={() => setIsNewPriorityLineModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Priority Line
          </Button>
          <Button onClick={() => setIsNewDateLineModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Date Line
          </Button>
          <Button onClick={() => setIsNewWorkBlockLineModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New WorkBlock Line
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className={`border rounded-lg p-6 flex-1 overflow-auto bg-white shadow-sm ${isRightSidebarOpen ? 'mr-4' : ''}`}>
          <DataTable columns={columns} data={formattedData} onRowClick={handleRowClick} />
        </div>

        {isRightSidebarOpen && selectedTask && (
          <RightSidebar 
            isOpen={isRightSidebarOpen} 
            onClose={handleCloseRightSidebar} 
            task={selectedTask} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={() => handleDeleteTask(selectedTask.id)}
          />
        )}
      </div>

      <NewLineModal
        isOpen={isNewLineModalOpen}
        onClose={() => setIsNewLineModalOpen(false)}
        onSave={handleNewLineSave}
      />
      <NewPriorityLineModal
        isOpen={isNewPriorityLineModalOpen}
        onClose={() => setIsNewPriorityLineModalOpen(false)}
        onSave={handleNewPriorityLineSave}
      />
      <NewDateLineModal
        isOpen={isNewDateLineModalOpen}
        onClose={() => setIsNewDateLineModalOpen(false)}
        onSave={handleNewDateLineSave}
      />
      <NewWorkBlockLineModal
        isOpen={isNewWorkBlockLineModalOpen}
        onClose={() => setIsNewWorkBlockLineModalOpen(false)}
        onSave={handleNewWorkBlockLineSave}
      />
    </div>
  );
};

export default MainContent;