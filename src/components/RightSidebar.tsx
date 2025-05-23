'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { updateTask } from '@/store/taskSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagInput from './TagInput';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose, task, onUpdateTask, onDeleteTask }) => {
  const dispatch = useAppDispatch();
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleInputChange = (field: keyof Task, value: any) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    onUpdateTask(editedTask);
  };

  if (!isOpen) return null;

  const renderBasicFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Line</label>
        <input
          type="text"
          value={editedTask.line}
          onChange={(e) => handleInputChange('line', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tag</label>
        <TagInput
          value={editedTask.tag}
          onChange={(value) => handleInputChange('tag', value)}
        />
      </div>
    </>
  );

  const renderPriorityFields = () => (
    <>
      {renderBasicFields()}
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <input
          type="date"
          value={editedTask.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <Select
          value={editedTask.status}
          onValueChange={(value) => handleInputChange('status', value as Task['status'])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No Status">No Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Not Completed">Not Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderDateFields = () => (
    <>
      {renderBasicFields()}
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={editedTask.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          value={editedTask.startTime}
          onChange={(e) => handleInputChange('startTime', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          value={editedTask.endTime}
          onChange={(e) => handleInputChange('endTime', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Final Date</label>
        <input
          type="date"
          value={editedTask.finalDateTime?.split('T')[0]}
          onChange={(e) => {
            const time = editedTask.finalDateTime?.split('T')[1] || '00:00:00Z';
            handleInputChange('finalDateTime', `${e.target.value}T${time}`);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Final Time</label>
        <input
          type="time"
          value={editedTask.finalDateTime?.split('T')[1]?.split(':').slice(0, 2).join(':')}
          onChange={(e) => {
            const date = editedTask.finalDateTime?.split('T')[0] || new Date().toISOString().split('T')[0];
            handleInputChange('finalDateTime', `${date}T${e.target.value}:00Z`);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Repeat</label>
        <Select
          value={editedTask.repeat || 'never'}
          onValueChange={(value) => handleInputChange('repeat', value as Task['repeat'])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Repeat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="day">Every Day</SelectItem>
            <SelectItem value="week">Every Week</SelectItem>
            <SelectItem value="month">Every Month</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {editedTask.repeat === 'custom' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Repeat Every</label>
            <input
              type="number"
              value={editedTask.repeatEvery}
              onChange={(e) => handleInputChange('repeatEvery', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Repeat On</label>
            <Select
              value={editedTask.repeatOn}
              onValueChange={(value) => handleInputChange('repeatOn', value as Task['repeatOn'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Time Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day(s)</SelectItem>
                <SelectItem value="week">Week(s)</SelectItem>
                <SelectItem value="month">Month(s)</SelectItem>
                <SelectItem value="year">Year(s)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </>
  );

  const renderWorkBlockFields = () => (
    <>
      {renderBasicFields()}
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <input
          type="date"
          value={editedTask.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={editedTask.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  );

  const renderFields = () => {
    switch (editedTask.type) {
      case 'basic':
        return renderBasicFields();
      case 'priority':
        return renderPriorityFields();
      case 'date':
        return renderDateFields();
      case 'workblock':
        return renderWorkBlockFields();
      default:
        return renderBasicFields();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit {editedTask.type.charAt(0).toUpperCase() + editedTask.type.slice(1)} Task</h2>
            <div className="flex gap-2">
              <Button variant="destructive" size="icon" onClick={onDeleteTask}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {renderFields()}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;