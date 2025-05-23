'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagInput from './TagInput';

interface NewPriorityLineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (line: string, tag: string, priority: string, status: "Completed" | "Not Completed" | "No Status") => void;
}

const NewPriorityLineModal: React.FC<NewPriorityLineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [line, setLine] = useState('');
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState<"Completed" | "Not Completed" | "No Status">('No Status');

  const handleSave = () => {
    onSave(line, tag, priority, status);
    setLine('');
    setTag('');
    setPriority('');
    setStatus('No Status');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Priority Line</DialogTitle>
          <DialogDescription>
            Add a new task with priority and status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="line" className="text-right">
              Line
            </Label>
            <Input
              id="line"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              Tag
            </Label>
            <div className="col-span-3">
              <TagInput
                value={tag}
                onChange={setTag}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Input
              id="priority"
              type="date"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={(value: "Completed" | "Not Completed" | "No Status") => setStatus(value)} value={status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Not Completed">Not Completed</SelectItem>
                <SelectItem value="No Status">No Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPriorityLineModal; 