"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider themes={["light", "dark", "green", "blue", "purple"]} {...props}>
      {children}
    </NextThemesProvider>
  )
}
