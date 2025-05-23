import axios from 'axios';
import { mockTasks } from '@/data/mock-tasks';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export interface Task {
  id: string;
  type: 'basic' | 'priority' | 'date' | 'workblock';
  line: string;
  tag: string;
  priority?: string;
  status?: 'Completed' | 'Not Completed' | 'No Status';
  startDate?: string;
  startTime?: string;
  endTime?: string;
  finalDateTime?: string;
  repeat?: 'never' | 'day' | 'week' | 'month' | 'custom';
  repeatEvery?: number;
  repeatOn?: 'day' | 'week' | 'month' | 'year';
  endDate?: string;
  finalDateDesc?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    try {
      await delay(1000); // Simulate 1 second delay
      return mockTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      await delay(1000); // Simulate 1 second delay
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        finalDateDesc: task.finalDateTime || '',
      };
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (task: Task): Promise<Task> => {
    try {
      await delay(1000); // Simulate 1 second delay
      return {
        ...task,
        finalDateDesc: task.finalDateTime || '',
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId: string): Promise<void> => {
    try {
      await delay(1000); // Simulate 1 second delay
      return;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default api; 