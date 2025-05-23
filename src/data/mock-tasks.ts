import { Task } from "@/components/tasks-columns";

export const mockTasks: Task[] = [
  {
    id: "1",
    line: "Buy groceries",
    tag: "#personal",
    priority: "",
    finalDateDesc: "",
    finalDateTime: "",
    status: "No Status",
    type: "basic",
  },
  {
    id: "2",
    line: "Finish report",
    tag: "#work",
    priority: "2023-11-01",
    finalDateDesc: "Next week",
    finalDateTime: "2023-11-01T17:00:00Z",
    status: "Not Completed",
    type: "priority",
  },
  {
    id: "3",
    line: "Go to gym",
    tag: "#health",
    priority: "",
    finalDateDesc: "Today",
    finalDateTime: "2023-10-25T19:00:00Z",
    status: "Completed",
    type: "date",
  },
]; 