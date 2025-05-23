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
import { Task } from "./tasks-columns"; // Import Task interface
import TagInput from './TagInput';

interface NewDateLineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTask: Partial<Task>) => void; // Modify onSave to accept partial task
}

const NewDateLineModal: React.FC<NewDateLineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [finalTime, setFinalTime] = useState('');
  const [repeat, setRepeat] = useState<Task['repeat']>('never'); // Use Task['repeat'] type
  const [repeatEvery, setRepeatEvery] = useState<number | undefined>(undefined);
  const [repeatOn, setRepeatOn] = useState<Task['repeatOn']>(undefined); // Use Task['repeatOn'] type

  const handleSave = () => {
    // Construct the new task object with all relevant fields
    const newTask: Partial<Task> = {
      line: name,
      tag,
      type: 'date', // Specify the type
      startDate,
      startTime,
      endTime,
      repeat: repeat || 'never', // Ensure repeat is never if empty
      repeatEvery: repeat === 'custom' ? repeatEvery : undefined, // Only save custom fields if repeat is custom
      repeatOn: repeat === 'custom' ? repeatOn : undefined,
      // Set other default fields or leave them undefined for partial task
      priority: '',
      finalDateDesc: 'Final Date',
      finalDateTime: finalDate && finalTime ? `${finalDate}T${finalTime}:00Z` : '',
      status: 'No Status',
    };
    onSave(newTask);
    // Reset form fields
    setName('');
    setTag('');
    setStartDate('');
    setStartTime('');
    setEndTime('');
    setFinalDate('');
    setFinalTime('');
    setRepeat('never');
    setRepeatEvery(undefined);
    setRepeatOn(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Date Line</DialogTitle>
          <DialogDescription>
            Add a new task with specific dates and times, and repeat options.
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
          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              End Time
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="finalDate" className="text-right">
              Final Date
            </Label>
            <Input
              id="finalDate"
              type="date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="finalTime" className="text-right">
              Final Time
            </Label>
            <Input
              id="finalTime"
              type="time"
              value={finalTime}
              onChange={(e) => setFinalTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* Repeat */}
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="repeat" className="text-right">
              Repeat
            </Label>
             <Select onValueChange={(value: "never" | "day" | "week" | "month" | "custom") => setRepeat(value)} value={repeat}>
                <SelectTrigger className="col-span-3">
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

          {/* Custom Repeat Options (Conditional) */}
          {repeat === 'custom' && (
            <div className="grid gap-4 py-4 border-t mt-4 pt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="repeatEvery" className="text-right">
                  Repeat Every
                </Label>
                <Input
                  id="repeatEvery"
                  type="number"
                  value={repeatEvery || ''}
                  onChange={(e) => setRepeatEvery(parseInt(e.target.value) || undefined)}
                  className="col-span-1"
                  min="1"
                />
                 <Select onValueChange={(value: Task['repeatOn']) => setRepeatOn(value)} value={repeatOn}>
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Time unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day(s)</SelectItem>
                      <SelectItem value="week">Week(s)</SelectItem>
                      <SelectItem value="month">Month(s)</SelectItem>
                      <SelectItem value="year">Year(s)</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              {/* Add more custom repeat options here if needed, like specific days of the week/month */}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewDateLineModal; 