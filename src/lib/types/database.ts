// Database type definitions for habitIt
// Generated from schema.sql

/**
 * User profile information linked to Supabase auth.users
 */
export interface Profile {
  id: string; // UUID - Links to auth.users.id
  email: string | null;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  timezone: string; // Default: 'UTC'
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Habit frequency type
 */
export type HabitFrequency = "daily" | "weekly" | "monthly";

/**
 * Habit category type
 */
export type HabitCategory =
  | "fitness"
  | "health"
  | "learning"
  | "productivity"
  | "mental-health"
  | "social"
  | "creativity"
  | "finance"
  | "other";

/**
 * Habit definition created by user
 */
export interface Habit {
  id: string; // UUID
  user_id: string; // UUID - References profiles.id
  name: string;
  description: string | null;
  category: HabitCategory;
  frequency: HabitFrequency;
  target_count: number; // Default: 1
  color: string; // Hex color, default: '#9333ea'
  icon: string | null; // Emoji or icon name
  is_active: boolean; // Default: true
  start_date: string; // DATE format (YYYY-MM-DD)
  end_date: string | null; // DATE format (YYYY-MM-DD)
  notes: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Habit completion tracking
 * One record per habit per day
 */
export interface HabitCompletion {
  id: string; // UUID
  habit_id: string; // UUID - References habits.id
  user_id: string; // UUID - References profiles.id
  completion_date: string; // DATE format (YYYY-MM-DD)
  completed_count: number; // Default: 1
  notes: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * User statistics (auto-maintained via triggers)
 * One record per user (1-to-1 with profiles)
 */
export interface UserStats {
  id: string; // UUID
  user_id: string; // UUID - References profiles.id (UNIQUE)
  total_habits: number; // Auto-maintained
  active_habits: number; // Auto-maintained
  total_completions: number; // Auto-maintained
  current_streak: number;
  longest_streak: number;
  last_completion_date: string | null; // DATE format
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Form types for creating/updating records
 */

export interface CreateProfileInput {
  email: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  timezone?: string;
}

export interface UpdateProfileInput {
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  timezone?: string;
  username?: string;
}

export interface CreateHabitInput {
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  target_count?: number;
  color?: string;
  icon?: string;
  start_date?: string; // Defaults to today
  end_date?: string | null;
  notes?: string;
}

export interface UpdateHabitInput {
  name?: string;
  description?: string;
  category?: HabitCategory;
  frequency?: HabitFrequency;
  target_count?: number;
  color?: string;
  icon?: string;
  is_active?: boolean;
  end_date?: string | null;
  notes?: string;
}

export interface CreateCompletionInput {
  habit_id: string;
  completion_date?: string; // Defaults to today
  completed_count?: number;
  notes?: string;
}

export interface UpdateCompletionInput {
  completed_count?: number;
  notes?: string;
}

/**
 * Aggregate types for common queries
 */

export interface HabitWithCompletion extends Habit {
  completed_today: number; // Count of completions for today
  last_completion: HabitCompletion | null;
  completion_percentage: number; // % of days completed (last 30 days)
}

export interface DashboardData {
  profile: Profile;
  stats: UserStats;
  habits: Habit[];
  recent_completions: HabitCompletion[];
}

export interface HabitDetail extends Habit {
  completions: HabitCompletion[];
  completion_count_30days: number;
  completion_count_this_week: number;
  streak_current: number;
  streak_longest: number;
}

/**
 * Database table names (for type safety)
 */
export const TABLES = {
  PROFILES: "profiles",
  HABITS: "habits",
  HABIT_COMPLETIONS: "habit_completions",
  USER_STATS: "user_stats",
} as const;

/**
 * Available habit categories for UI dropdowns
 */
export const HABIT_CATEGORIES: Record<HabitCategory, string> = {
  fitness: "Fitness",
  health: "Health",
  learning: "Learning",
  productivity: "Productivity",
  "mental-health": "Mental Health",
  social: "Social",
  creativity: "Creativity",
  finance: "Finance",
  other: "Other",
};

/**
 * Available frequencies for UI dropdowns
 */
export const HABIT_FREQUENCIES: Record<HabitFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

/**
 * Default habit colors (Tailwind palette)
 */
export const HABIT_COLORS = {
  violet: "#9333ea", // violet-600 (default)
  blue: "#2563eb", // blue-600
  emerald: "#059669", // emerald-600
  orange: "#ea580c", // orange-600
  red: "#dc2626", // red-600
  pink: "#ec4899", // pink-500
  cyan: "#0891b2", // cyan-600
  amber: "#b45309", // amber-700
} as const;
