-- =====================================================
-- habitIt Database Schema
-- Supabase SQL Schema with RLS Policies and Triggers
-- =====================================================

-- =====================================================
-- 1. PROFILES TABLE
-- =====================================================
-- Stores user profile information linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- =====================================================
-- 2. HABITS TABLE
-- =====================================================
-- Stores habit definitions created by users
CREATE TABLE IF NOT EXISTS public.habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- e.g., 'fitness', 'health', 'learning', 'productivity'
  frequency TEXT NOT NULL, -- e.g., 'daily', 'weekly', 'monthly'
  target_count INTEGER DEFAULT 1, -- How many times per period
  color TEXT DEFAULT '#9333ea', -- violet-600 as default
  icon TEXT, -- emoji or icon name
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE, -- NULL means ongoing
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--  indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_is_active ON public.habits(is_active);
CREATE INDEX IF NOT EXISTS idx_habits_created_at ON public.habits(created_at DESC);

-- =====================================================
-- 3. HABIT_COMPLETIONS TABLE
-- =====================================================
-- Tracks daily/periodic completion of habits
CREATE TABLE IF NOT EXISTS public.habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  completion_date DATE NOT NULL,
  completed_count INTEGER DEFAULT 1, -- Track partial completion
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Ensure one entry per habit per day
  UNIQUE(habit_id, completion_date)
);

--  indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_habit_completions_habit_id ON public.habit_completions(habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_completions_user_id ON public.habit_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_completions_date ON public.habit_completions(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_completions_user_date ON public.habit_completions(user_id, completion_date DESC);

-- =====================================================
-- 4. USER_STATS TABLE
-- =====================================================
-- Stores aggregated statistics for users
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_habits INTEGER DEFAULT 0,
  active_habits INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--  index for user lookup
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES RLS POLICIES
-- =====================================================
-- Users can view all profiles (public profiles)
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (via trigger on auth.users)
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- HABITS RLS POLICIES
-- =====================================================
-- Users can view their own habits
CREATE POLICY "Users can view their own habits" 
  ON public.habits FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert habits for themselves
CREATE POLICY "Users can create their own habits" 
  ON public.habits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own habits
CREATE POLICY "Users can update their own habits" 
  ON public.habits FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own habits
CREATE POLICY "Users can delete their own habits" 
  ON public.habits FOR DELETE 
  USING (auth.uid() = user_id);

-- =====================================================
-- HABIT_COMPLETIONS RLS POLICIES
-- =====================================================
-- Users can view their own completions
CREATE POLICY "Users can view their own completions" 
  ON public.habit_completions FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert completions for their habits
CREATE POLICY "Users can create completions for their habits" 
  ON public.habit_completions FOR INSERT 
  WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM public.habits 
    WHERE id = habit_id AND user_id = auth.uid()
  ));

-- Users can update their own completions
CREATE POLICY "Users can update their own completions" 
  ON public.habit_completions FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own completions
CREATE POLICY "Users can delete their own completions" 
  ON public.habit_completions FOR DELETE 
  USING (auth.uid() = user_id);

-- =====================================================
-- USER_STATS RLS POLICIES
-- =====================================================
-- Users can view their own stats
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can update their own stats (via triggers, not directly)
CREATE POLICY "Users can update their own stats" 
  ON public.user_stats FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- =====================================================
-- TRIGGER 1: Create user_stats when profile is created
-- =====================================================
CREATE OR REPLACE FUNCTION public.create_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.create_user_stats();

-- =====================================================
-- TRIGGER 2: Update profiles.updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_profiles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_profiles_timestamp();

-- =====================================================
-- TRIGGER 3: Update habits.updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_habits_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_habits_updated
BEFORE UPDATE ON public.habits
FOR EACH ROW
EXECUTE FUNCTION public.update_habits_timestamp();

-- =====================================================
-- TRIGGER 4: Update habit_completions.updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_habit_completions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_habit_completions_updated
BEFORE UPDATE ON public.habit_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_habit_completions_timestamp();

-- =====================================================
-- TRIGGER 5: Update user_stats.updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_user_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_stats_updated
BEFORE UPDATE ON public.user_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_user_stats_timestamp();

-- =====================================================
-- TRIGGER 6: Update user_stats totals when habit is created
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_habit_created()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_stats
  SET 
    total_habits = total_habits + 1,
    active_habits = active_habits + 1,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_habit_created
AFTER INSERT ON public.habits
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_habit_created();

-- =====================================================
-- TRIGGER 7: Update user_stats totals when habit is deleted
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_habit_deleted()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_stats
  SET 
    total_habits = GREATEST(0, total_habits - 1),
    active_habits = CASE WHEN OLD.is_active THEN GREATEST(0, active_habits - 1) ELSE active_habits END,
    updated_at = NOW()
  WHERE user_id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_habit_deleted
AFTER DELETE ON public.habits
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_habit_deleted();

-- =====================================================
-- TRIGGER 8: Update user_stats totals when habit is toggled active
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_habit_active_changed()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.is_active <> NEW.is_active THEN
    UPDATE public.user_stats
    SET 
      active_habits = active_habits + CASE WHEN NEW.is_active THEN 1 ELSE -1 END,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_habit_active_changed
AFTER UPDATE ON public.habits
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_habit_active_changed();

-- =====================================================
-- TRIGGER 9: Update user_stats totals when completion is recorded
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_completion_created()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_stats
  SET 
    total_completions = total_completions + NEW.completed_count,
    last_completion_date = NEW.completion_date,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_completion_created
AFTER INSERT ON public.habit_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_completion_created();

-- =====================================================
-- TRIGGER 10: Update user_stats totals when completion is updated
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_completion_updated()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate the difference in completed_count
  UPDATE public.user_stats
  SET 
    total_completions = total_completions + (NEW.completed_count - OLD.completed_count),
    last_completion_date = CASE 
      WHEN NEW.completed_count > 0 THEN NEW.completion_date
      ELSE last_completion_date
    END,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_completion_updated
AFTER UPDATE ON public.habit_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_completion_updated();

-- =====================================================
-- TRIGGER 11: Update user_stats totals when completion is deleted
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_stats_on_completion_deleted()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_stats
  SET 
    total_completions = GREATEST(0, total_completions - OLD.completed_count),
    updated_at = NOW()
  WHERE user_id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_completion_deleted
AFTER DELETE ON public.habit_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_stats_on_completion_deleted();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE public.profiles IS 'User profile information linked to Supabase auth.users';
COMMENT ON TABLE public.habits IS 'Habit definitions created and managed by users';
COMMENT ON TABLE public.habit_completions IS 'Tracks completion of habits with date and count';
COMMENT ON TABLE public.user_stats IS 'Aggregated statistics for users (auto-maintained via triggers)';

COMMENT ON COLUMN public.habits.frequency IS 'Frequency of habit: daily, weekly, monthly';
COMMENT ON COLUMN public.habit_completions.completed_count IS 'Number of times completed (for tracking partial completions)';
COMMENT ON COLUMN public.user_stats.current_streak IS 'Current consecutive days/periods of completion';
COMMENT ON COLUMN public.user_stats.longest_streak IS 'Longest streak ever achieved';
