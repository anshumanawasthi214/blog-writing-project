import { cn } from "../../lib/utils";

const variants = {
  default: "bg-zinc-900 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
  outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900",
};

export default function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
