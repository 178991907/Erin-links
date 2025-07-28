"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedWelcomeProps {
  englishText: string
  chineseText: string
}

export function AnimatedWelcome({ englishText, chineseText }: AnimatedWelcomeProps) {
  const [colorIndex, setColorIndex] = useState(0)

  const englishColorClasses = [
    "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500",
    "bg-gradient-to-r from-green-500 via-teal-500 to-blue-500",
    "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
    "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500",
    "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600",
  ]

  const chineseColorClasses = [
    "text-emerald-600 dark:text-emerald-400",
    "text-amber-600 dark:text-amber-400",
    "text-sky-600 dark:text-sky-400",
    "text-rose-600 dark:text-rose-400",
    "text-violet-600 dark:text-violet-400",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % englishColorClasses.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [englishColorClasses.length])

  return (
    <div className="space-y-1 sm:space-y-2 text-center">
      <p
        className={cn(
          "text-xl sm:text-2xl mb-1 sm:mb-2 inline-block text-transparent bg-clip-text font-medium transition-all duration-1000",
          englishColorClasses[colorIndex],
        )}
      >
        {englishText}
      </p>
      <p className={cn("text-lg sm:text-xl transition-colors duration-1000", chineseColorClasses[colorIndex])}>
        {chineseText}
      </p>
    </div>
  )
}
