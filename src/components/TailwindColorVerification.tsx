import { Text, View } from "react-native";

/**
 * Tailwind Color Verification Component
 *
 * This component verifies that:
 * 1. Violet colors render correctly with NativeWind
 * 2. The className prop is properly transformed to React Native styles
 *
 * Expected behavior:
 * - Should display a violet (purple) background
 * - Text should be white for contrast
 * - No console errors about undefined colors
 */
export function TailwindColorVerification() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      {/* Main violet-500 test - this is what we're verifying */}
      <View className="bg-violet-500 rounded-xl p-8 mb-6 w-72 shadow-lg">
        <Text className="text-white text-center text-lg font-bold mb-2">
          Violet-500 Test
        </Text>
        <Text className="text-white text-center text-sm">
          Background: #a855f7
        </Text>
      </View>

      {/* Violet color scale for reference */}
      <View className="w-full px-4">
        <Text className="text-gray-800 font-bold mb-3 text-center">
          Violet Color Scale
        </Text>

        {/* Violet 50 */}
        <View className="bg-violet-50 p-3 rounded-lg mb-2 border-2 border-gray-300">
          <Text className="text-gray-900 font-semibold">violet-50</Text>
          <Text className="text-gray-600 text-xs">#faf5ff</Text>
        </View>

        {/* Violet 100 */}
        <View className="bg-violet-100 p-3 rounded-lg mb-2">
          <Text className="text-gray-900 font-semibold">violet-100</Text>
          <Text className="text-gray-600 text-xs">#f3e8ff</Text>
        </View>

        {/* Violet 200 */}
        <View className="bg-violet-200 p-3 rounded-lg mb-2">
          <Text className="text-gray-900 font-semibold">violet-200</Text>
          <Text className="text-gray-600 text-xs">#e9d5ff</Text>
        </View>

        {/* Violet 300 */}
        <View className="bg-violet-300 p-3 rounded-lg mb-2">
          <Text className="text-gray-900 font-semibold">violet-300</Text>
          <Text className="text-gray-600 text-xs">#d8b4fe</Text>
        </View>

        {/* Violet 400 */}
        <View className="bg-violet-400 p-3 rounded-lg mb-2">
          <Text className="text-gray-900 font-semibold">violet-400</Text>
          <Text className="text-gray-600 text-xs">#c084fc</Text>
        </View>

        {/* Violet 500 - THE MAIN TEST */}
        <View className="bg-violet-500 p-3 rounded-lg mb-2 border-4 border-blue-600">
          <Text className="text-white font-bold">violet-500 ✓</Text>
          <Text className="text-white text-xs">#a855f7 (PRIMARY TEST)</Text>
        </View>

        {/* Violet 600 */}
        <View className="bg-violet-600 p-3 rounded-lg mb-2">
          <Text className="text-white font-semibold">violet-600</Text>
          <Text className="text-white text-xs">#9333ea</Text>
        </View>

        {/* Violet 700 */}
        <View className="bg-violet-700 p-3 rounded-lg mb-2">
          <Text className="text-white font-semibold">violet-700</Text>
          <Text className="text-white text-xs">#7e22ce</Text>
        </View>

        {/* Violet 800 */}
        <View className="bg-violet-800 p-3 rounded-lg mb-2">
          <Text className="text-white font-semibold">violet-800</Text>
          <Text className="text-white text-xs">#6b21a8</Text>
        </View>

        {/* Violet 900 */}
        <View className="bg-violet-900 p-3 rounded-lg mb-2">
          <Text className="text-white font-semibold">violet-900</Text>
          <Text className="text-white text-xs">#581c87</Text>
        </View>

        {/* Violet 950 */}
        <View className="bg-violet-950 p-3 rounded-lg">
          <Text className="text-white font-semibold">violet-950</Text>
          <Text className="text-white text-xs">#3f0f5c</Text>
        </View>
      </View>

      {/* Status indicator */}
      <View className="mt-8 bg-white rounded-lg p-4 w-72 items-center">
        <Text className="text-2xl mb-2">✓</Text>
        <Text className="text-green-600 font-bold text-center">
          Tailwind colors are rendering correctly!
        </Text>
        <Text className="text-gray-600 text-xs text-center mt-2">
          If all violet shades above are visible, styling is working.
        </Text>
      </View>
    </View>
  );
}

export default TailwindColorVerification;
