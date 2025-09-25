"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Label htmlFor="theme-switch" className="flex items-center gap-2">
        {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </Label>
    </div>
  )
}
