import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(
  status: string
): "default" | "success" | "warning" | "danger" | "info" {
  const map: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
    active: "success",
    inactive: "danger",
    pending: "warning",
    approved: "success",
    rejected: "danger",
    "in-review": "info",
    completed: "success",
    "at-risk": "warning",
    critical: "danger",
    new: "info",
    onboarded: "success",
    suspended: "danger",
  };
  return map[status.toLowerCase()] ?? "default";
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export const DISTRICTS = [
  "Lucknow",
  "Varanasi",
  "Agra",
  "Kanpur",
  "Prayagraj",
  "Gorakhpur",
  "Meerut",
  "Ghaziabad",
  "Bareilly",
  "Aligarh",
  "Moradabad",
  "Saharanpur",
  "Noida",
  "Mathura",
  "Jhansi",
];
