import { Text, View } from "react-native";

/**
 * TailwindBadge Component
 *
 * Example of a small utility component using Tailwind CSS classes.
 * Demonstrates size and color variants using className composition.
 *
 * Features:
 * - Multiple size variants
 * - Violet color palette
 * - Flexible background colors
 */
type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface TailwindBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function TailwindBadge({
  label,
  variant = "default",
  size = "md",
}: TailwindBadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-100";
      case "warning":
        return "bg-amber-100";
      case "error":
        return "bg-red-100";
      case "info":
        return "bg-blue-100";
      default:
        return "bg-violet-100";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "success":
        return "text-green-800";
      case "warning":
        return "text-amber-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-violet-800";
    }
  };

  const getSize = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1";
      case "lg":
        return "px-4 py-2";
      case "md":
      default:
        return "px-3 py-1.5";
    }
  };

  const getSizeText = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-base";
      case "md":
      default:
        return "text-sm";
    }
  };

  return (
    <View
      className={`${getBackgroundColor()} ${getSize()} rounded-full self-start`}
    >
      <Text className={`${getTextColor()} ${getSizeText()} font-semibold`}>
        {label}
      </Text>
    </View>
  );
}
