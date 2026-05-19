import { useAuthStore } from "@/lib/stores/useAuthStore";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface VerificationResult {
  name: string;
  status: "success" | "error" | "pending";
  message: string;
}

/**
 * Verification Component
 *
 * This component verifies:
 * 1. Supabase client initialization
 * 2. Zustand store accessibility and updates
 *
 * Use during development to ensure both services are working correctly.
 * This can be imported and rendered temporarily for debugging.
 */
export const VerificationComponent = () => {
  const [results, setResults] = useState<VerificationResult[]>([]);

  // Access Zustand store to verify it works
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setIsAuthenticated,
    setIsLoading,
  } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      const verificationResults: VerificationResult[] = [];

      // Test 1: Verify Supabase client exists and is accessible
      try {
        if (supabase && supabase.auth) {
          verificationResults.push({
            name: "Supabase Client Initialization",
            status: "success",
            message: "Supabase client initialized successfully",
          });
        } else {
          throw new Error("Supabase client is undefined");
        }
      } catch (error) {
        verificationResults.push({
          name: "Supabase Client Initialization",
          status: "error",
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Test 2: Verify Supabase can fetch session
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        verificationResults.push({
          name: "Supabase Session Check",
          status: "success",
          message: session ? "User session active" : "No active session",
        });
      } catch (error) {
        verificationResults.push({
          name: "Supabase Session Check",
          status: "error",
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Test 3: Verify Zustand store is accessible
      try {
        if (user !== null || isAuthenticated === false) {
          verificationResults.push({
            name: "Zustand Store Accessibility",
            status: "success",
            message: "Store state is accessible",
          });
        }
      } catch (error) {
        verificationResults.push({
          name: "Zustand Store Accessibility",
          status: "error",
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Test 4: Verify Zustand store mutations work
      try {
        const testUser = { id: "test-123", email: "test@example.com" };
        setUser(testUser);
        setIsAuthenticated(true);
        setIsLoading(false);

        // Verify the state was updated
        const currentState = useAuthStore.getState();
        if (
          currentState.user?.id === testUser.id &&
          currentState.isAuthenticated === true
        ) {
          verificationResults.push({
            name: "Zustand Store Mutations",
            status: "success",
            message: "Store state updates working correctly",
          });
          // Reset to clean state
          setUser(null);
          setIsAuthenticated(false);
        } else {
          throw new Error("State mutation did not update correctly");
        }
      } catch (error) {
        verificationResults.push({
          name: "Zustand Store Mutations",
          status: "error",
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      setResults(verificationResults);
    };

    verify();
  }, [setUser, setIsAuthenticated, setIsLoading]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Verification Results</Text>

      {results.length === 0 ? (
        <Text style={styles.loadingText}>Running verification...</Text>
      ) : (
        results.map((result, index) => (
          <View key={index} style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultName}>{result.name}</Text>
              <Text
                style={[
                  styles.resultStatus,
                  {
                    color:
                      result.status === "success"
                        ? "#10B981"
                        : result.status === "error"
                          ? "#EF4444"
                          : "#F59E0B",
                  },
                ]}
              >
                {result.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.resultMessage}>{result.message}</Text>
          </View>
        ))
      )}

      <View style={styles.stateSection}>
        <Text style={styles.stateTitle}>Current Store State:</Text>
        <Text style={styles.stateText}>User ID: {user?.id || "None"}</Text>
        <Text style={styles.stateText}>
          Authenticated: {isAuthenticated ? "Yes" : "No"}
        </Text>
        <Text style={styles.stateText}>
          Loading: {isLoading ? "Yes" : "No"}
        </Text>
      </View>
    </ScrollView>
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
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  resultName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  resultStatus: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
  },
  resultMessage: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  stateSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: "#8B5CF6",
  },
  stateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  stateText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontFamily: "Courier New",
  },
});

export default VerificationComponent;
