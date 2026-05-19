import { Pressable, Text } from "react-native";

/**
 * TailwindButton Component
 *
 * Example of a styled button using Tailwind CSS classes via NativeWind.
 * NativeWind transforms className strings to React Native styles at compile time.
 *
 * Features:
 * - Violet theme colors
 * - Active state feedback
 * - Responsive padding
 */
interface TailwindButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

export function TailwindButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: TailwindButtonProps) {
  const getButtonStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-violet-100 rounded-lg px-4 py-3";
      case "outline":
        return "border-2 border-violet-600 rounded-lg px-4 py-3";
      default:
        return "bg-violet-600 rounded-lg px-4 py-3";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "secondary":
        return "text-violet-900 font-bold text-center";
      case "outline":
        return "text-violet-600 font-bold text-center";
      default:
        return "text-white font-bold text-center";
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`${getButtonStyles()} ${disabled ? "opacity-50" : ""} active:opacity-75`}
    >
      <Text className={getTextStyles()}>{title}</Text>
    </Pressable>
  );
}
