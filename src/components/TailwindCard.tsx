import { Text, View } from "react-native";

/**
 * TailwindCard Component
 *
 * Example of a reusable card component using Tailwind CSS classes.
 * Shows how to compose components with className props.
 *
 * Features:
 * - Violet-themed shadows and borders
 * - Flexible content layout
 * - Responsive spacing
 */
interface TailwindCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: "default" | "highlight" | "accent";
}

export function TailwindCard({
  title,
  subtitle,
  children,
  variant = "default",
}: TailwindCardProps) {
  const getCardStyles = () => {
    switch (variant) {
      case "highlight":
        return "bg-violet-50 border-l-4 border-violet-600";
      case "accent":
        return "bg-gradient-to-br from-violet-50 to-violet-100";
      default:
        return "bg-white";
    }
  };

  return (
    <View
      className={`${getCardStyles()} rounded-xl p-4 mb-4 shadow-md border border-gray-100`}
    >
      <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-gray-600 mb-3">{subtitle}</Text>
      )}
      {children && <View className="mt-2">{children}</View>}
    </View>
  );
}
