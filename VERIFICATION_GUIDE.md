# Verification & Testing Guide

This guide shows how to verify that the Supabase client and Zustand store are working correctly.

## Files Created

### 1. **VerificationComponent.tsx**

A comprehensive automated verification component that runs checks on app load.

**What it checks:**

- ✓ Supabase client initialization
- ✓ Supabase session access
- ✓ Zustand store accessibility
- ✓ Zustand store mutations

**Location:** `src/components/VerificationComponent.tsx`

### 2. **DemoComponent.tsx**

An interactive demo component to manually test integration.

**Features:**

- Test login (updates Zustand store)
- Test Supabase connectivity
- Test logout (clears store)
- Display current store state

**Location:** `src/components/DemoComponent.tsx`

---

## How to Use

### Option 1: Auto Verification (Recommended for quick check)

Import and render the `VerificationComponent` in your main app:

```typescript
import { VerificationComponent } from "@/components/VerificationComponent";

export default function App() {
  return <VerificationComponent />;
}
```

This will automatically:

1. Initialize and verify the Supabase client
2. Check Supabase session
3. Verify Zustand store access
4. Test store mutations

**Expected Output:**

```
✓ Supabase Client Initialization - success
✓ Supabase Session Check - success (No active session)
✓ Zustand Store Accessibility - success
✓ Zustand Store Mutations - success
```

---

### Option 2: Interactive Demo

Import and render the `DemoComponent` for manual testing:

```typescript
import { DemoComponent } from "@/components/DemoComponent";

export default function App() {
  return <DemoComponent />;
}
```

**Testing Steps:**

1. Click **"Test Login"** - Updates store with mock user
2. Observe user state displays as "Authenticated"
3. Click **"Test Supabase"** - Verifies Supabase connectivity
4. Click **"Test Logout"** - Clears authentication state

---

## Environment Setup

Before testing, ensure you have a `.env.local` file in the project root:

```bash
# Copy from template
cp .env.example .env.local
```

Add your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Troubleshooting

### Issue: "Missing Supabase configuration"

**Solution:**

- Ensure `.env.local` exists in the project root
- Check that `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart the dev server: `expo start --clear`

### Issue: Store state not persisting

**Solution:**

- The store uses `AsyncStorage` via Zustand's `persist` middleware
- Clear app data and restart if needed
- Check DevTools in browser/debugger for store state

### Issue: Supabase session check fails

**Solution:**

- Verify your Supabase project is active at https://app.supabase.com
- Check network connectivity
- Ensure CORS is properly configured in Supabase settings

---

## Integration in Real Features

Once verified, use in your actual components:

```typescript
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { supabase } from "@/lib/supabase";

export function MyComponent() {
  const { user, isAuthenticated, setUser } = useAuthStore();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "user@example.com",
      password: "password",
    });

    if (data.user) {
      setUser({ id: data.user.id, email: data.user.email || "" });
    }
  };

  return (
    <View>
      <Text>{isAuthenticated ? "Logged In" : "Logged Out"}</Text>
    </View>
  );
}
```

---

## Next Steps

After verification succeeds:

1. ✓ Remove verification components from your main app
2. ✓ Integrate `useAuthStore` and `supabase` into real features
3. ✓ Add more Zustand stores as needed for app state
4. ✓ Implement Supabase authentication methods
5. ✓ Add database queries using Supabase client

---

## Store Capabilities

### useAuthStore

Current state management for:

- `user` - Current user object
- `isAuthenticated` - Authentication status
- `isLoading` - Loading state

Available actions:

- `setUser(user)` - Update user
- `setIsAuthenticated(bool)` - Update auth status
- `setIsLoading(bool)` - Update loading state
- `logout()` - Clear user and auth state

Extend this store by adding more state and actions as your app grows.

---

## Useful Commands

```bash
# Start dev server
npm start

# Clear cache and restart
expo start --clear

# Check for import errors
npm run lint

# Verify dependencies installed
npm ls supabase zustand
```
