# Task Management Application

A React-based task management application with support for different types of tasks: basic, priority, date-based, and work blocks.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## API Integration Points

### 1. API Configuration
- Location: `src/services/api.ts`
- Replace the mock API URL with your actual endpoint:
```typescript
const API_URL = 'https://api.example.com'; // Replace with your actual API URL
```

### 2. Mock Data Replacement
- Location: `src/data/mock-tasks.ts`
- Replace mock data with actual API responses
- Current mock data structure:
```typescript
export const mockTasks: Task[] = [
  {
    id: "1",
    type: "basic",
    line: "Sample Task",
    tag: "work",
    // ... other fields
  }
];
```

### 3. API Service Methods
- Location: `src/services/api.ts`
- Current mock implementations to replace:
  - `getTasks()`: Fetch all tasks
  - `createTask()`: Create new task
  - `updateTask()`: Update existing task
  - `deleteTask()`: Delete task

### 4. Redux Store Integration
- Location: `src/store/taskSlice.ts`
- Current implementation uses mock data
- Replace with actual API calls in thunks:
  - `fetchTasks`
  - `createTask`
  - `updateTask`
  - `deleteTask`

## Task Types

1. **Basic Task**
   - Line (text)
   - Tag

2. **Priority Task**
   - Line
   - Tag
   - Priority
   - Status (Completed/Not Completed/No Status)

3. **Date Task**
   - Line
   - Tag
   - Start Date/Time
   - End Time
   - Final Date/Time
   - Repeat options (never/day/week/month/custom)

4. **Work Block Task**
   - Line
   - Tag
   - Priority
   - End Date

## UI Components

- `MainContent.tsx`: Main task list and modals
- `RightSidebar.tsx`: Task editing panel
- `NewLineModal.tsx`: Basic task creation
- `NewPriorityLineModal.tsx`: Priority task creation
- `NewDateLineModal.tsx`: Date task creation
- `NewWorkBlockLineModal.tsx`: Work block task creation

## State Management

- Redux store for global state
- Local state for UI components
- Toast notifications for operation feedback

## Styling

- Tailwind CSS for styling
- Shadcn UI components
- Custom components in `src/components/ui`

## Testing

- Add unit tests for components
- Add integration tests for API calls
- Add end-to-end tests for user flows

## Future Improvements

1. Add authentication
2. Implement real-time updates
3. Add task filtering and sorting
4. Implement task categories
5. Add task dependencies
6. Implement task templates
7. Add export/import functionality
8. Implement task sharing
