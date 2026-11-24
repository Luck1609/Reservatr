import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // "h-10 w-full min-w-0 rounded-full border border-[#dfe9e3] bg-[#fbfcfa] px-4 text-sm font-normal",
        // "text-[#17343c] transition outline-none focus:border-[#76c9a5] focus:ring-4 focus:ring-violet-200",
        // "dark:bg-white/5 dark:border-white/10 dark:text-slate-300 placeholder:text-slate-400 dark:disabled:text-slate-500",


        "h-10 w-full min-w-0 rounded-full border border-input bg-transparent px-2.5 py-1 text-base text-foreground",
        "transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring",
        "focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed",
        "disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "md:text-sm dark:bg-input/90 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
