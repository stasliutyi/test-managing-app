import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Task } from "@/services/api";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "line",
    header: "Line",
  },
  {
    accessorKey: "tag",
    header: "Tag",
    // We can add custom cell rendering later to make it look like a tag
  },
  {
    accessorKey: "priority",
    header: "Priority",
    // Custom cell rendering for date formatting later
  },
  {
    accessorKey: "finalDateDesc",
    header: "Final Date Desc",
  },
  {
    accessorKey: "finalDateTime",
    header: "Final Date Time",
    // Custom cell rendering for date and time formatting later
  },
  {
    accessorKey: "status",
    header: "Status",
    // Custom cell rendering for dropdown later
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const task = row.original;
      // We need to access the onRowClick function passed from MainContent
      const onRowClick = (table.options as any).onRowClick; // Access onRowClick from table options

      return (
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0"
          onClick={() => onRowClick?.(task)} // Call onRowClick with the task data
        >
          Edit
        </Button>
      );
    },
  },
];

export type { Task }; 