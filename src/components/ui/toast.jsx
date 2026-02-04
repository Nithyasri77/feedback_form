import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

/**
 * This file defines:
 * - How a SINGLE toast looks
 * - Positioning (top-center with slight offset)
 * - Styling (notification-like, not modal)
 */

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
      ref={ref}
      {...props}
      className={[
        // Position: top-center, slightly down
        "fixed left-1/2 top-16 z-100",
        "-translate-x-1/2",

        // Layout
        "flex w-full  max-w-lg flex-col gap-2",
        "outline-none",
        className,
      ].join(" ")}
    />
  ),
);
ToastViewport.displayName = "ToastViewport";

export const Toast = React.forwardRef(({ children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    duration={Infinity} // important: disables auto close
    {...props}
    className={[
      "relative flex w-full items-start gap-3",
      "rounded-lg border",
      "border-red-600/60 bg-gray-900 text-white",
      "px-4 py-3 shadow-lg",
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-80",
      "data-[state=open]:slide-in-from-top-2",
    ].join(" ")}
  >
    {children}
  </ToastPrimitives.Root>
));
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef(({ children, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    {...props}
    className="text-md font-medium text-white"
  >
    {children}
  </ToastPrimitives.Title>
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef(
  ({ children, ...props }, ref) => (
    <ToastPrimitives.Description
      ref={ref}
      {...props}
      className="text-sm text-white/55"
    >
      {children}
    </ToastPrimitives.Description>
  ),
);
ToastDescription.displayName = "ToastDescription";

export const ToastClose = React.forwardRef((props, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    {...props}
    className="absolute right-3 top-3 rounded-md p-1 text-red-900/40 hover:text-red-900"
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";
