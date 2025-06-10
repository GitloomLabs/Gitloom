import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate Metatdata title with " – Gitloom" affix.
 * @param title - String to add affix.
 * @returns
 */
export function generateMetadataTitleFor(title: string) {
  return `${title} – Gitloom`;
}

export async function waitFor(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}
