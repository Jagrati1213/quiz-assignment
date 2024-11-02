import React from "react";

export function Skeleton() {
  return (
    <div className="px-6 animate-pulse">
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-200 w-full"></div>
        <div className="skeleton-header bg-gray-200 w-full h-24 rounded"></div>
        <div className="skeleton-header bg-gray-200 w-full h-24 rounded"></div>
        <div className="skeleton-header bg-gray-200 w-full h-24 rounded"></div>
        <div className="skeleton-header bg-gray-200 w-full h-24 rounded"></div>
      </div>
    </div>
  );
}
