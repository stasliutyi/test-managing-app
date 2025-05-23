'use client';

import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-full h-full bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Tags</h2>
      {/* Tag list */}
      <ul>
        <li className="mb-2">#mock-tag-1</li>
        <li className="mb-2">#mock-tag-2</li>
        <li className="mb-2">#mock-tag-3</li>
      </ul>
      {/* Create tag form */}
      <div className="mt-4">
        <input type="text" placeholder="New Tag" className="border p-2 rounded w-full" />
        <button className="mt-2 bg-blue-500 text-white p-2 rounded w-full">Create Tag</button>
      </div>
    </aside>
  );
};

export default Sidebar;