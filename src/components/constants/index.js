export function getInitials(name) {
  if (!name) return ""

  // If it's an email, remove domain
  const base = name.includes('@') ? name.split('@')[0] : name

  // If it's one word (no space), use first 2 letters
  if (!base.includes(' ')) {
    return base.substring(0, 2).toUpperCase()
  }

  // Otherwise, take first letters of each word
  return base
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}


import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}