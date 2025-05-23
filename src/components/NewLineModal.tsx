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

interface NewLineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (line: string, tag: string) => void;
}

const NewLineModal: React.FC<NewLineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [line, setLine] = useState('');
  const [tag, setTag] = useState('');

  const handleSave = () => {
    onSave(line, tag);
    setLine('');
    setTag('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Line</DialogTitle>
          <DialogDescription>
            Add a new basic line to your tasks.
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLineModal; 