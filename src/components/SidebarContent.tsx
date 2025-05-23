'use client';

import React from 'react';
import { Tag, Hash, PanelLeftClose } from "lucide-react";
import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger, SidebarInset, SidebarSeparator, SidebarHeader, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedTag, selectUniqueTags } from '@/store/taskSlice';

const SidebarContentWrapper: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const dispatch = useAppDispatch();
  const selectedTag = useAppSelector(state => state.tasks.selectedTag);
  const tags = useAppSelector(selectUniqueTags);

  const handleTagClick = (tag: string | null) => {
    dispatch(setSelectedTag(tag === selectedTag ? null : tag));
  };

  return (
    <>
      <SidebarHeader className="p-2">
        {isCollapsed ? (
          <div className="flex justify-center">
            <SidebarTrigger className="h-8 w-8">
              <PanelLeftClose className="h-5 w-5" />
            </SidebarTrigger>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            <SidebarTrigger className="h-8 w-8">
              <PanelLeftClose className="h-5 w-5" />
            </SidebarTrigger>
          </div>
        )}
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && "Tags"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton 
                    tooltip={tag}
                    isActive={selectedTag === tag}
                    onClick={() => handleTagClick(tag)}
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    {!isCollapsed && tag}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional Footer content */}
      </SidebarFooter>
    </>
  );
};

export default SidebarContentWrapper; 