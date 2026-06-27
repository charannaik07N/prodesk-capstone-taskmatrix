'use client';

import React from 'react';

export function ProjectCardSkeleton() {
  return (
    <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#F3F4F6]" />
        <div className="w-16 h-5 rounded-full bg-[#F3F4F6]" />
      </div>
      <div className="w-3/4 h-5 rounded bg-[#E5E7EB] mb-2" />
      <div className="w-full h-4 rounded bg-[#F3F4F6] mb-1" />
      <div className="w-2/3 h-4 rounded bg-[#F3F4F6] mb-6" />
      
      <div className="flex flex-col gap-2 pt-4 border-t border-[#F3F4F6]">
        <div className="flex justify-between items-center">
          <div className="w-14 h-3 rounded bg-[#F3F4F6]" />
          <div className="w-8 h-3 rounded bg-[#F3F4F6]" />
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-1.5" />
      </div>
    </div>
  );
}

export function TaskRowSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6] animate-pulse">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-4 h-4 rounded bg-[#E5E7EB]" />
        <div className="w-1/3 h-4 rounded bg-[#E5E7EB]" />
      </div>
      <div className="flex items-center gap-6">
        <div className="w-20 h-5 rounded-full bg-[#F3F4F6]" />
        <div className="w-16 h-5 rounded bg-[#F3F4F6]" />
        <div className="w-24 h-4 rounded bg-[#F3F4F6]" />
        <div className="w-20 h-4 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}

export function KanbanCardSkeleton() {
  return (
    <div className="p-4 rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm animate-pulse space-y-3">
      <div className="flex justify-between items-start">
        <div className="w-16 h-4 rounded bg-[#F3F4F6]" />
        <div className="w-6 h-6 rounded bg-[#F3F4F6]" />
      </div>
      <div className="w-full h-4 rounded bg-[#E5E7EB]" />
      <div className="w-3/4 h-4 rounded bg-[#F3F4F6]" />
      <div className="flex justify-between items-center pt-2 border-t border-[#F9FAFB]">
        <div className="w-6 h-6 rounded-full bg-[#E5E7EB]" />
        <div className="w-14 h-3 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}

export function AnalyticsCardSkeleton() {
  return (
    <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#F3F4F6]" />
        <div className="w-28 h-4 rounded bg-[#E5E7EB]" />
      </div>
      <div className="w-24 h-8 rounded bg-[#E5E7EB]" />
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="p-4 border-b border-[#F3F4F6] flex gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="w-3/4 h-4 rounded bg-[#E5E7EB]" />
        <div className="w-full h-3 rounded bg-[#F3F4F6]" />
        <div className="w-16 h-3 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="flex gap-4 py-4 border-b border-[#F3F4F6] animate-pulse">
      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="w-1/3 h-4 rounded bg-[#E5E7EB]" />
          <div className="w-16 h-3 rounded bg-[#F3F4F6]" />
        </div>
        <div className="w-2/3 h-3 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}

export function DrawerSkeleton() {
  return (
    <div className="p-6 space-y-8 animate-pulse bg-white h-full">
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div className="w-32 h-5 rounded bg-[#E5E7EB]" />
        <div className="w-8 h-8 rounded bg-[#F3F4F6]" />
      </div>
      <div className="w-3/4 h-8 rounded bg-[#E5E7EB]" />
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
          <div className="w-20 h-4 rounded bg-[#F3F4F6]" />
          <div className="w-24 h-6 rounded bg-[#E5E7EB]" />
        </div>
        <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
          <div className="w-20 h-4 rounded bg-[#F3F4F6]" />
          <div className="w-24 h-6 rounded bg-[#E5E7EB]" />
        </div>
        <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
          <div className="w-20 h-4 rounded bg-[#F3F4F6]" />
          <div className="w-24 h-6 rounded bg-[#E5E7EB]" />
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <div className="w-24 h-4 rounded bg-[#E5E7EB]" />
        <div className="w-full h-32 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}
