// src/components/ui/badge.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
      outline: "text-foreground border-border"
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }