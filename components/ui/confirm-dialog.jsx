'use client';

import React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  isLoading = false,
  variant = 'destructive',
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 isolate z-50 bg-black/20 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          role="alertdialog"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-white p-6 text-sm text-[#111827] shadow-lg ring-1 ring-black/5 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[#DC2626]">
              <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 id="alert-dialog-title" className="text-lg font-semibold leading-none text-[#111827]">
                {title}
              </h2>
            </div>
            <p id="alert-dialog-description" className="text-sm text-[#6B7280] pl-[52px]">
              {description}
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4 pt-4 border-t border-[#F3F4F6]">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className="h-9 font-medium"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className={cn(
                "h-9 font-medium text-white shadow-sm inline-flex items-center justify-center min-w-[80px]",
                variant === 'destructive'
                  ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8]'
              )}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {confirmText}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
