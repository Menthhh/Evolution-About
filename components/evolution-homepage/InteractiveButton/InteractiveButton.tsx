import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import { LoadingSpinner } from "../LoadingStates/LoadingStates";

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

/**
 * Enhanced interactive button with animations and loading states
 * Requirements: 2.3, 4.3 - Interactive states and animations
 */
export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  glow = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    evolutionClasses.interactive.button,
    {
      [evolutionClasses.interactive.glow]: glow,
    }
  );

  const variantClasses = {
    primary:
      "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    accent:
      "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:from-accent/90 hover:to-accent/70 shadow-lg",
    ghost: "text-foreground hover:bg-muted hover:text-accent",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-4 py-2 text-base min-h-[44px]",
    lg: "px-6 py-3 text-lg min-h-[52px]",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size={size === "lg" ? "md" : "sm"}
          className="text-current"
        />
      )}
      <span className={cn(loading && "opacity-70")}>{children}</span>
    </button>
  );
};

export default InteractiveButton;
