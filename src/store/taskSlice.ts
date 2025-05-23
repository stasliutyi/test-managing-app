import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/services/api';
import api from '@/services/api';

interface TaskState {
  tasks: Task[];
  selectedTag: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTag: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.getTasks();
    return response;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id'>) => {
    const response = await api.createTask(task);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    const response = await api.updateTask(task);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await api.deleteTask(taskId);
    return taskId;
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export const { setSelectedTag } = taskSlice.actions;

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export const selectSelectedTag = (state: { tasks: TaskState }) => state.tasks.selectedTag;
export const selectLoading = (state: { tasks: TaskState }) => state.tasks.loading;
export const selectError = (state: { tasks: TaskState }) => state.tasks.error;

export const selectFilteredTasks = (state: { tasks: TaskState }) => {
  const { tasks, selectedTag } = state.tasks;
  return selectedTag ? tasks.filter(task => task.tag === selectedTag) : tasks;
};

export const selectUniqueTags = (state: { tasks: TaskState }) => {
  const tags = state.tasks.tasks.map(task => task.tag).filter(Boolean);
  return Array.from(new Set(tags));
};

export default taskSlice.reducer; 