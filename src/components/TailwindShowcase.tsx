import { ScrollView, Text, View } from "react-native";
import { TailwindBadge } from "./TailwindBadge";
import { TailwindButton } from "./TailwindButton";
import { TailwindCard } from "./TailwindCard";

/**
 * TailwindShowcase Component
 *
 * Demonstrates all Tailwind CSS styled components working together.
 * Use this during development to verify styling is working correctly.
 */
export function TailwindShowcase() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-violet-900 mb-2">
          Tailwind CSS Showcase
        </Text>
        <Text className="text-gray-600 mb-6">
          Powered by NativeWind - Tailwind CSS for React Native
        </Text>

        {/* Buttons Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-4">
          Buttons
        </Text>
        <TailwindButton title="Primary Button" variant="primary" />
        <View className="h-3" />
        <TailwindButton title="Secondary Button" variant="secondary" />
        <View className="h-3" />
        <TailwindButton title="Outline Button" variant="outline" />
        <View className="h-3" />
        <TailwindButton title="Disabled Button" variant="primary" disabled />

        {/* Cards Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">Cards</Text>
        <TailwindCard title="Default Card" subtitle="Standard card styling">
          <Text className="text-sm text-gray-600">
            This is a default card with neutral styling.
          </Text>
        </TailwindCard>

        <TailwindCard
          title="Highlight Card"
          subtitle="With violet accent"
          variant="highlight"
        >
          <Text className="text-sm text-gray-700">
            This card has a violet left border for emphasis.
          </Text>
        </TailwindCard>

        <TailwindCard
          title="Accent Card"
          subtitle="With gradient background"
          variant="accent"
        >
          <Text className="text-sm text-gray-700">
            This card features a gradient background using violet tones.
          </Text>
        </TailwindCard>

        {/* Badges Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">
          Badges
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          <TailwindBadge label="Default" variant="default" size="md" />
          <TailwindBadge label="Success" variant="success" size="md" />
          <TailwindBadge label="Warning" variant="warning" size="md" />
          <TailwindBadge label="Error" variant="error" size="md" />
          <TailwindBadge label="Info" variant="info" size="md" />
        </View>

        {/* Badge Sizes */}
        <View className="flex-row flex-wrap gap-2 mb-6">
          <TailwindBadge label="Small" size="sm" />
          <TailwindBadge label="Medium" size="md" />
          <TailwindBadge label="Large" size="lg" />
        </View>

        {/* Color Palette Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">
          Violet Theme Palette
        </Text>

        {/* Violet Color Swatches */}
        {[
          { name: "violet-50", color: "bg-violet-50", text: "text-gray-900" },
          { name: "violet-100", color: "bg-violet-100", text: "text-gray-900" },
          { name: "violet-200", color: "bg-violet-200", text: "text-gray-900" },
          { name: "violet-300", color: "bg-violet-300", text: "text-gray-900" },
          { name: "violet-400", color: "bg-violet-400", text: "text-white" },
          { name: "violet-500", color: "bg-violet-500", text: "text-white" },
          { name: "violet-600", color: "bg-violet-600", text: "text-white" },
          { name: "violet-700", color: "bg-violet-700", text: "text-white" },
          { name: "violet-800", color: "bg-violet-800", text: "text-white" },
          { name: "violet-900", color: "bg-violet-900", text: "text-white" },
          { name: "violet-950", color: "bg-violet-950", text: "text-white" },
        ].map((swatch) => (
          <View
            key={swatch.name}
            className={`${swatch.color} rounded-lg p-3 mb-2 flex-row justify-between items-center`}
          >
            <Text className={`${swatch.text} font-semibold`}>
              {swatch.name}
            </Text>
            <Text className={`${swatch.text} text-xs opacity-75`}>
              Violet Theme
            </Text>
          </View>
        ))}

        {/* Typography Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3 mt-6">
          Typography
        </Text>
        <Text className="text-4xl font-bold text-violet-900 mb-2">
          Heading 1 (text-4xl)
        </Text>
        <Text className="text-3xl font-bold text-violet-800 mb-2">
          Heading 2 (text-3xl)
        </Text>
        <Text className="text-2xl font-bold text-violet-700 mb-2">
          Heading 3 (text-2xl)
        </Text>
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Body Text (text-lg)
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          Regular text (text-base)
        </Text>
        <Text className="text-sm text-gray-500 mb-2">Small text (text-sm)</Text>
        <Text className="text-xs text-gray-400 mb-6">
          Extra small text (text-xs)
        </Text>

        {/* Spacing Section */}
        <Text className="text-xl font-bold text-gray-900 mb-3">
          Spacing Examples
        </Text>
        <View className="bg-violet-50 rounded-lg p-4 mb-6 border border-violet-200">
          <View className="bg-violet-600 h-16 rounded mb-2" />
          <Text className="text-sm text-gray-600">Padding: p-4</Text>
        </View>

        {/* Footer */}
        <View className="bg-violet-100 rounded-lg p-4 mb-8">
          <Text className="text-sm font-semibold text-violet-900 mb-1">
            🎨 Tailwind CSS is Ready!
          </Text>
          <Text className="text-xs text-violet-700">
            All components are styled with Tailwind CSS classes via NativeWind.
            Check the source code to see how to use className props.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default TailwindShowcase;
