import { useAuthStore } from "@/lib/stores/useAuthStore";
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Demo Component
 *
 * This component demonstrates practical usage of:
 * 1. The Supabase client for authentication
 * 2. The Zustand store for state management
 *
 * Use this as a template for integrating both services in your app.
 */
export const DemoComponent = () => {
  const [demoMessage, setDemoMessage] = useState("Ready to test");
  const [isProcessing, setIsProcessing] = useState(false);

  // Access Zustand store
  const { user, isAuthenticated, setUser, setIsAuthenticated, logout } =
    useAuthStore();

  /**
   * Simulates a login action
   * Updates Zustand store state and demonstrates Supabase integration
   */
  const handleTestLogin = async () => {
    setIsProcessing(true);
    try {
      // Simulate login by setting store state
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email: "demo@habitit.app",
      };

      // Update Zustand store
      setUser(mockUser);
      setIsAuthenticated(true);

      setDemoMessage(`✓ Logged in as ${mockUser.email}`);
    } catch (error) {
      setDemoMessage(
        `✗ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Simulates a logout action
   * Clears Zustand store state
   */
  const handleTestLogout = async () => {
    setIsProcessing(true);
    try {
      logout();
      setDemoMessage("✓ Logged out successfully");
    } catch (error) {
      setDemoMessage(
        `✗ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Tests Supabase connectivity
   */
  const handleTestSupabase = async () => {
    setIsProcessing(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        setDemoMessage("✓ Supabase session found");
      } else {
        setDemoMessage("✓ Supabase connected (no active session)");
      }
    } catch (error) {
      setDemoMessage(
        `✗ Supabase Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integration Demo</Text>

      {/* Status Display */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.statusValue,
            {
              color: isAuthenticated ? "#10B981" : "#6B7280",
            },
          ]}
        >
          {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </Text>
      </View>

      {/* User Info Display */}
      <View style={styles.userCard}>
        <Text style={styles.cardTitle}>Current User:</Text>
        <Text style={styles.userInfo}>ID: {user?.id || "None"}</Text>
        <Text style={styles.userInfo}>
          Email: {user?.email || "Not logged in"}
        </Text>
      </View>

      {/* Message Display */}
      <View style={styles.messageCard}>
        <Text style={styles.messageText}>{demoMessage}</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleTestLogin}
        disabled={isProcessing || isAuthenticated}
      >
        {isProcessing ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Test Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.supabaseButton]}
        onPress={handleTestSupabase}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Test Supabase</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleTestLogout}
        disabled={isProcessing || !isAuthenticated}
      >
        {isProcessing ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Test Logout</Text>
        )}
      </TouchableOpacity>

      {/* Instructions */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instruction}>
          1. Click "Test Login" to set store state
        </Text>
        <Text style={styles.instruction}>
          2. Click "Test Supabase" to verify connectivity
        </Text>
        <Text style={styles.instruction}>
          3. Click "Test Logout" to clear state
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  statusLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8B5CF6",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 50,
    justifyContent: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  messageText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#10B981",
  },
  supabaseButton: {
    backgroundColor: "#3B82F6",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#8B5CF6",
  },
  instructionsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  instruction: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
});

export default DemoComponent;
