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
import TagInput from './TagInput';

interface NewWorkBlockLineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, tag: string, priority: string, endDate: string) => void;
}

const NewWorkBlockLineModal: React.FC<NewWorkBlockLineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState(''); // Will be date
  const [endDate, setEndDate] = useState(''); // Will be date

  const handleSave = () => {
    onSave(name, tag, priority, endDate);
    setName('');
    setTag('');
    setPriority('');
    setEndDate('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New WorkBlock Line</DialogTitle>
          <DialogDescription>
            Add a new work block task with priority and end date.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name (Line) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* Tag */}
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
           {/* Priority */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
             {/* Placeholder for Date Picker */}
            <Input
              id="priority"
              type="date"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="col-span-3"
            />
          </div>
           {/* End Date */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
             {/* Placeholder for Date Picker */}
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="col-span-3"
            />
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

export default NewWorkBlockLineModal; 