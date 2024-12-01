"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  onThemeChange?: () => void;
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onThemeChange?.();
  };

  return (
    <div className="space-y-1">
      {[
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
      ].map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant="ghost"
          onClick={() => handleThemeChange(value)}
          className={cn(
            "w-full justify-start px-2 py-1.5 text-sm",
            theme === value && "bg-accent text-accent-foreground"
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
