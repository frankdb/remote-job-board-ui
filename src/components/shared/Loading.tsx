import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "default" | "lg";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = "default",
  text,
  className,
  fullScreen = true, // Default to full screen centering
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerSizeClasses = {
    sm: "gap-2",
    default: "gap-3",
    lg: "gap-4",
  };

  const textSizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm",
        containerSizeClasses[size],
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p
          className={cn(
            "text-muted-foreground animate-pulse",
            textSizeClasses[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
