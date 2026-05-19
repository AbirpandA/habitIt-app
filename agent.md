# AI Coding Assistant Guidelines

## Project Context
Gamified habit tracker (React Native, Supabase, Zustand, RevenueCat).

## Architecture & Patterns
- **State Management:** Use `zustand` with persistent storage middleware for local-first habit tracking.
- **Data Fetching:** Use `@supabase/supabase-js` v2.x. Always handle loading/error states in React components.
- **Gamification Logic:** Centralize XP calculations in a `hooks/useGamification.ts` file. Avoid business logic in UI components.
- **Auth:** Wrap the application root in a `AuthProvider` using Supabase Auth listener.

## Coding Standards
- **React Native:** Use Expo Router conventions. Prefer `View` and `Text` with Tailwind classes (nativewind).
- **Typescript:** Strictly type database interfaces via Supabase-generated types.
- **Performance:** Memoize expensive calculations (XP tally, progress charts) using `useMemo`.
- **RevenueCat:** Use the `react-native-purchases` SDK. Wrap premium-only features in a `withPremium` HOC or a `useSubscription` hook.

## Implementation Guidelines
- **Tailwind CSS (Native):** Always use class names over inline styles.
- **Persistence:** Ensure Zustand stores utilize `AsyncStorage` for persistence across app restarts.
- **Notifications:** Use `expo-notifications` for triggers; schedule them upon habit creation.
- **File Structure:** Feature-based folder structure (e.g., `/features/habits`, `/features/auth`, `/components/shared`).