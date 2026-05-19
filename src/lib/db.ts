import { supabase } from "./supabase";
import type {
  CreateCompletionInput,
  CreateHabitInput,
  CreateProfileInput,
  Habit,
  HabitCompletion,
  Profile,
  UpdateCompletionInput,
  UpdateHabitInput,
  UpdateProfileInput,
  UserStats,
} from "./types/database";

/**
 * Profile database operations
 */
export const profilesDb = {
  /**
   * Get current user's profile
   */
  async getCurrentProfile(): Promise<Profile | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data;
  },

  /**
   * Create user profile (called after auth signup)
   */
  async createProfile(input: CreateProfileInput): Promise<Profile | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email: input.email,
          username: input.username,
          display_name: input.display_name || input.username,
          avatar_url: input.avatar_url || null,
          bio: input.bio || null,
          timezone: input.timezone || "UTC",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
    return data;
  },

  /**
   * Update user profile
   */
  async updateProfile(input: UpdateProfileInput): Promise<Profile | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .update(input)
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
    return data;
  },

  /**
   * Get user profile by username
   */
  async getProfileByUsername(username: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("Error fetching profile:", error);
    }
    return data || null;
  },
};

/**
 * Habits database operations
 */
export const habitsDb = {
  /**
   * Get all habits for current user
   */
  async getUserHabits(filters?: {
    is_active?: boolean;
    category?: string;
  }): Promise<Habit[]> {
    let query = supabase.from("habits").select("*");

    if (filters?.is_active !== undefined) {
      query = query.eq("is_active", filters.is_active);
    }
    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching habits:", error);
      return [];
    }
    return data || [];
  },

  /**
   * Get active habits for current user
   */
  async getActiveHabits(): Promise<Habit[]> {
    return habitsDb.getUserHabits({ is_active: true });
  },

  /**
   * Get single habit by ID
   */
  async getHabit(id: string): Promise<Habit | null> {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching habit:", error);
    }
    return data || null;
  },

  /**
   * Create new habit
   */
  async createHabit(input: CreateHabitInput): Promise<Habit | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("habits")
      .insert([
        {
          user_id: user.id,
          name: input.name,
          description: input.description || null,
          category: input.category,
          frequency: input.frequency,
          target_count: input.target_count || 1,
          color: input.color || "#9333ea",
          icon: input.icon || null,
          start_date: input.start_date || today,
          end_date: input.end_date || null,
          notes: input.notes || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating habit:", error);
      throw error;
    }
    return data;
  },

  /**
   * Update habit
   */
  async updateHabit(
    id: string,
    input: UpdateHabitInput,
  ): Promise<Habit | null> {
    const { data, error } = await supabase
      .from("habits")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating habit:", error);
      throw error;
    }
    return data;
  },

  /**
   * Toggle habit active/inactive
   */
  async toggleHabitActive(
    id: string,
    isActive: boolean,
  ): Promise<Habit | null> {
    return habitsDb.updateHabit(id, { is_active: isActive });
  },

  /**
   * Delete habit
   */
  async deleteHabit(id: string): Promise<void> {
    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) {
      console.error("Error deleting habit:", error);
      throw error;
    }
  },
};

/**
 * Habit completions database operations
 */
export const completionsDb = {
  /**
   * Get completions for a habit
   */
  async getHabitCompletions(
    habitId: string,
    limit: number = 30,
  ): Promise<HabitCompletion[]> {
    const { data, error } = await supabase
      .from("habit_completions")
      .select("*")
      .eq("habit_id", habitId)
      .order("completion_date", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching completions:", error);
      return [];
    }
    return data || [];
  },

  /**
   * Get completions for a date range
   */
  async getCompletionsInRange(
    habitId: string,
    startDate: string,
    endDate: string,
  ): Promise<HabitCompletion[]> {
    const { data, error } = await supabase
      .from("habit_completions")
      .select("*")
      .eq("habit_id", habitId)
      .gte("completion_date", startDate)
      .lte("completion_date", endDate)
      .order("completion_date", { ascending: true });

    if (error) {
      console.error("Error fetching completions:", error);
      return [];
    }
    return data || [];
  },

  /**
   * Get completion for specific date
   */
  async getCompletion(
    habitId: string,
    date: string,
  ): Promise<HabitCompletion | null> {
    const { data, error } = await supabase
      .from("habit_completions")
      .select("*")
      .eq("habit_id", habitId)
      .eq("completion_date", date)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching completion:", error);
    }
    return data || null;
  },

  /**
   * Record habit completion for today
   */
  async completeHabitToday(
    habitId: string,
    input?: Omit<CreateCompletionInput, "habit_id" | "completion_date">,
  ): Promise<HabitCompletion | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const today = new Date().toISOString().split("T")[0];

    // Try to insert, if unique constraint fails, update instead
    const { data: insertData, error: insertError } = await supabase
      .from("habit_completions")
      .insert([
        {
          habit_id: habitId,
          user_id: user.id,
          completion_date: today,
          completed_count: input?.completed_count || 1,
          notes: input?.notes || null,
        },
      ])
      .select()
      .single();

    if (!insertError) return insertData;

    // If unique constraint error, update instead
    if (
      insertError.code === "23505" ||
      insertError.message.includes("unique constraint")
    ) {
      return completionsDb.updateCompletion(habitId, today, {
        completed_count: (input?.completed_count || 1) + 1,
        notes: input?.notes,
      });
    }

    console.error("Error recording completion:", insertError);
    throw insertError;
  },

  /**
   * Update habit completion
   */
  async updateCompletion(
    habitId: string,
    completionDate: string,
    input: UpdateCompletionInput,
  ): Promise<HabitCompletion | null> {
    const { data, error } = await supabase
      .from("habit_completions")
      .update(input)
      .eq("habit_id", habitId)
      .eq("completion_date", completionDate)
      .select()
      .single();

    if (error) {
      console.error("Error updating completion:", error);
      throw error;
    }
    return data;
  },

  /**
   * Delete habit completion
   */
  async deleteCompletion(
    habitId: string,
    completionDate: string,
  ): Promise<void> {
    const { error } = await supabase
      .from("habit_completions")
      .delete()
      .eq("habit_id", habitId)
      .eq("completion_date", completionDate);

    if (error) {
      console.error("Error deleting completion:", error);
      throw error;
    }
  },

  /**
   * Get user's recent completions (across all habits)
   */
  async getUserRecentCompletions(
    limit: number = 50,
  ): Promise<HabitCompletion[]> {
    const { data, error } = await supabase
      .from("habit_completions")
      .select("*")
      .order("completion_date", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent completions:", error);
      return [];
    }
    return data || [];
  },
};

/**
 * User statistics database operations
 */
export const statsDb = {
  /**
   * Get current user's stats
   */
  async getUserStats(): Promise<UserStats | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching stats:", error);
    }
    return data || null;
  },

  /**
   * Get stats for any user by ID
   */
  async getUserStatsById(userId: string): Promise<UserStats | null> {
    const { data, error } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching stats:", error);
    }
    return data || null;
  },

  /**
   * Get user's daily completion count
   */
  async getTodayCompletions(): Promise<number> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return 0;

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("habit_completions")
      .select("id")
      .eq("user_id", user.id)
      .eq("completion_date", today);

    if (error) {
      console.error("Error fetching today completions:", error);
      return 0;
    }
    return data?.length || 0;
  },

  /**
   * Calculate streak for a habit
   */
  async calculateStreak(habitId: string): Promise<number> {
    const completions = await completionsDb.getHabitCompletions(habitId, 100);
    if (!completions.length) return 0;

    const sorted = completions.sort(
      (a, b) =>
        new Date(b.completion_date).getTime() -
        new Date(a.completion_date).getTime(),
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const completion of sorted) {
      const completionDate = new Date(completion.completion_date);
      completionDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (currentDate.getTime() - completionDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (daysDiff === 0 || daysDiff === streak) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  },
};

/**
 * Combined database operations
 */
export const db = {
  profiles: profilesDb,
  habits: habitsDb,
  completions: completionsDb,
  stats: statsDb,

  /**
   * Get full dashboard data for current user
   */
  async getDashboardData() {
    const [profile, stats, habits, recentCompletions] = await Promise.all([
      profilesDb.getCurrentProfile(),
      statsDb.getUserStats(),
      habitsDb.getActiveHabits(),
      completionsDb.getUserRecentCompletions(10),
    ]);

    return {
      profile,
      stats,
      habits,
      recentCompletions,
    };
  },

  /**
   * Setup user after authentication
   */
  async setupNewUser(
    input: CreateProfileInput,
  ): Promise<{ profile: Profile; stats: UserStats } | null> {
    try {
      const profile = await profilesDb.createProfile(input);
      if (!profile) throw new Error("Failed to create profile");

      // Wait a moment for trigger to create stats
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const stats = await statsDb.getUserStats();
      if (!stats) throw new Error("Failed to get user stats");

      return { profile, stats };
    } catch (error) {
      console.error("Error setting up new user:", error);
      throw error;
    }
  },
};

export type DatabaseAPI = typeof db;
