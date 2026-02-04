import * as React from "react";

const listeners = [];
let memoryState = { toasts: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast],
      };

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: [],
      };

    default:
      return state;
  }
}

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

let toastId = 0;
function generateId() {
  toastId += 1;
  return toastId.toString();
}

/**
 * THIS is the "API"
 * You will call this like:
 * toast({ title, description, action })
 */
export function toast(props) {
  const id = generateId();

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      open: true,
      ...props,
      onOpenChange: (open) => {
        if (!open) {
          dispatch({ type: "REMOVE_TOAST" });
        }
      },
    },
  });
}

/**
 * Hook used by <Toaster />
 * Listens for toast changes and re-renders UI
 */
export function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
  };
}