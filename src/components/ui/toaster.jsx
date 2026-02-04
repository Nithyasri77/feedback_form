import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";
import { AlertTriangle } from "lucide-react";

/**
 * This component:
 * - Listens to toast state
 * - Renders notification UI
 * - Should be mounted ONCE in the app
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex w-full items-center justify-between gap-4">
            {/* LEFT: icon + text */}
            <div className="flex  items-center gap-4">
              {/* Warning icon */}
              <AlertTriangle className="h-11 w-11 text-red-600 shrink-0" />

              {/* Text */}
              <div className="flex flex-col gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {/* RIGHT: Retry (vertically centered automatically) */}
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-full bg-red-600  focus:outline-none transition-all duration-200 px-5 py-1.5 text-md font-medium text-white hover:bg-red-700/95"
            >
              Retry
            </button>
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
