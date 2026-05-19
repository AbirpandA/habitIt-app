import { Pressable, Text, View } from "react-native";

/**
 * Tailwind CSS Common Patterns Reference
 *
 * Copy and paste these patterns into your components as needed.
 * All examples use NativeWind with className props.
 */

// ============================================================================
// PATTERN 1: Basic Container with Padding
// ============================================================================
export function PatternContainer() {
  return (
    <View className="flex-1 bg-gray-50 px-4 py-6">
      <Text className="text-lg font-bold text-gray-900">Content goes here</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 2: Centered Content
// ============================================================================
export function PatternCentered() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-violet-600">Centered</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 3: Row with Space Between
// ============================================================================
export function PatternRowSpaceBetween() {
  return (
    <View className="flex-row justify-between items-center p-4 bg-white">
      <Text className="text-lg font-semibold text-gray-900">Left</Text>
      <Text className="text-lg font-semibold text-gray-900">Right</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 4: Card Layout
// ============================================================================
export function PatternCard() {
  return (
    <View className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">Card Title</Text>
      <Text className="text-sm text-gray-600">Card content goes here</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 5: Stacked List Items
// ============================================================================
export function PatternListItem() {
  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-semibold text-gray-900">
          Item Title
        </Text>
        <Text className="text-sm text-gray-500 mt-1">Item subtitle</Text>
      </View>
      <Text className="text-lg text-violet-600">›</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 6: Grid Layout (2 columns)
// ============================================================================
export function PatternGrid() {
  return (
    <View className="flex-row gap-2 mb-4">
      <View className="flex-1 bg-violet-100 rounded-lg p-4 items-center justify-center h-32">
        <Text className="text-sm font-bold text-violet-900">Item 1</Text>
      </View>
      <View className="flex-1 bg-violet-100 rounded-lg p-4 items-center justify-center h-32">
        <Text className="text-sm font-bold text-violet-900">Item 2</Text>
      </View>
    </View>
  );
}

// ============================================================================
// PATTERN 7: Button Primary
// ============================================================================
export function PatternButtonPrimary() {
  return (
    <Pressable className="bg-violet-600 rounded-lg px-6 py-3 items-center justify-center active:opacity-75">
      <Text className="text-white font-bold text-center">Primary Button</Text>
    </Pressable>
  );
}

// ============================================================================
// PATTERN 8: Button Secondary
// ============================================================================
export function PatternButtonSecondary() {
  return (
    <Pressable className="bg-gray-100 rounded-lg px-6 py-3 items-center justify-center active:opacity-75">
      <Text className="text-gray-900 font-bold text-center">
        Secondary Button
      </Text>
    </Pressable>
  );
}

// ============================================================================
// PATTERN 9: Button Outline
// ============================================================================
export function PatternButtonOutline() {
  return (
    <Pressable className="border-2 border-violet-600 rounded-lg px-6 py-3 items-center justify-center active:opacity-75">
      <Text className="text-violet-600 font-bold text-center">
        Outline Button
      </Text>
    </Pressable>
  );
}

// ============================================================================
// PATTERN 10: Input Field
// ============================================================================
export function PatternInputField() {
  return (
    <View className="bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4">
      {/* Note: TextInput from react-native doesn't support className directly,
          use style prop with StyleSheet or inline styles */}
    </View>
  );
}

// ============================================================================
// PATTERN 11: Badge/Label
// ============================================================================
export function PatternBadge() {
  return (
    <View className="bg-violet-100 rounded-full px-3 py-1 self-start">
      <Text className="text-violet-900 text-xs font-semibold">Badge</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 12: Divider
// ============================================================================
export function PatternDivider() {
  return <View className="h-px bg-gray-200 my-4" />;
}

// ============================================================================
// PATTERN 13: Section Header
// ============================================================================
export function PatternSectionHeader() {
  return (
    <View className="px-4 py-2 mb-3">
      <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider">
        Section Title
      </Text>
    </View>
  );
}

// ============================================================================
// PATTERN 14: Empty State
// ============================================================================
export function PatternEmptyState() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Text className="text-2xl">📭</Text>
      </View>
      <Text className="text-lg font-bold text-gray-900 text-center mb-2">
        No Items Found
      </Text>
      <Text className="text-sm text-gray-600 text-center">
        You don't have any items yet. Create one to get started.
      </Text>
    </View>
  );
}

// ============================================================================
// PATTERN 15: Alert/Banner
// ============================================================================
export function PatternAlert() {
  return (
    <View className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-4 mb-4">
      <Text className="text-sm font-bold text-violet-900 mb-1">
        Alert Title
      </Text>
      <Text className="text-sm text-violet-700">
        This is an alert message with violet theme
      </Text>
    </View>
  );
}

// ============================================================================
// PATTERN 16: Modal Overlay
// ============================================================================
export function PatternModal() {
  return (
    <View className="flex-1 bg-black bg-opacity-50 items-center justify-center p-4">
      <View className="bg-white rounded-2xl p-6 w-full max-w-md">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Modal Title
        </Text>
        <Text className="text-sm text-gray-600 mb-6">
          Modal content goes here
        </Text>
        <View className="flex-row gap-2">
          <Pressable className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
            <Text className="text-gray-900 font-bold text-center">Cancel</Text>
          </Pressable>
          <Pressable className="flex-1 bg-violet-600 rounded-lg px-4 py-2">
            <Text className="text-white font-bold text-center">Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ============================================================================
// PATTERN 17: Loading Spinner Placeholder
// ============================================================================
export function PatternLoadingState() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-violet-600" />
      <Text className="text-gray-600 mt-4 text-sm">Loading...</Text>
    </View>
  );
}

// ============================================================================
// PATTERN 18: Error State
// ============================================================================
export function PatternErrorState() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center mb-4">
        <Text className="text-2xl">❌</Text>
      </View>
      <Text className="text-lg font-bold text-gray-900 text-center mb-2">
        Something went wrong
      </Text>
      <Text className="text-sm text-gray-600 text-center mb-6">
        Please try again later or contact support
      </Text>
      <Pressable className="bg-red-600 rounded-lg px-6 py-3">
        <Text className="text-white font-bold">Retry</Text>
      </Pressable>
    </View>
  );
}

// ============================================================================
// PATTERN 19: Tab Bar Item
// ============================================================================
export function PatternTabItem() {
  const isActive = true;
  return (
    <Pressable
      className={`flex-1 items-center justify-center py-3 border-b-2 ${
        isActive
          ? "border-violet-600 bg-violet-50"
          : "border-transparent bg-white"
      }`}
    >
      <Text
        className={`font-bold ${
          isActive ? "text-violet-600" : "text-gray-600"
        }`}
      >
        Tab
      </Text>
    </Pressable>
  );
}

// ============================================================================
// PATTERN 20: Floating Action Button
// ============================================================================
export function PatternFAB() {
  return (
    <Pressable className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-violet-600 items-center justify-center shadow-lg active:opacity-75">
      <Text className="text-2xl text-white">+</Text>
    </Pressable>
  );
}

/**
 * QUICK REFERENCE
 *
 * Colors:        bg-{color}-{shade}, text-{color}-{shade}
 * Spacing:       p-{n}, m-{n}, px-{n}, py-{n}, mb-{n}, mt-{n}, gap-{n}
 * Sizing:        w-{n}, h-{n}, min-w-{n}, max-w-{n}
 * Layout:        flex, flex-row, items-center, justify-between
 * Rounding:      rounded-lg, rounded-xl, rounded-full
 * Shadows:       shadow-md, shadow-lg
 * Borders:       border, border-{n}, border-{color}-{shade}
 * Opacity:       opacity-{n}
 * Typography:    text-{size}, font-{weight}
 *
 * Example: className="flex-1 bg-violet-600 rounded-lg p-4 text-white font-bold"
 */
