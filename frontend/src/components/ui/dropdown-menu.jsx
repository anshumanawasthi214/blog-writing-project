"use client";

import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

const DropdownContext = createContext(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within DropdownMenu.");
  }
  return context;
}

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    const onEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const value = useMemo(() => ({ open, setOpen, containerRef }), [open]);

  return (
    <DropdownContext.Provider value={value}>
      <div className="relative inline-block" ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild = false, children }) {
  const { open, setOpen } = useDropdownContext();

  if (asChild) {
    const child = Children.only(children);
    return cloneElement(child, {
      onClick: (event) => {
        child.props.onClick?.(event);
        setOpen(!open);
      },
      "aria-expanded": open,
      "aria-haspopup": "menu",
    });
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="menu"
      className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, children }) {
  const { open } = useDropdownContext();
  if (!open) return null;

  return (
    <div
      role="menu"
      className={cn(
        "absolute right-0 z-50 mt-2 w-56 rounded-md border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className, children }) {
  return (
    <p
      className={cn(
        "px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </p>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />;
}

export function DropdownMenuItem({ className, children, ...props }) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-2 text-left text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
