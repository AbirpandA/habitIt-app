import "nativewind/types";

/**
 * NativeWind Type Augmentation
 *
 * This file extends React Native component types to support the className prop
 * when using NativeWind. It allows TypeScript to recognize className as a valid
 * property on React Native components.
 */

// Extend React Native component props to include className
declare global {
  namespace React {
    interface ViewProps extends PropsWithChildren {
      className?: string;
    }
    interface TextProps extends PropsWithChildren {
      className?: string;
    }
    interface PressableProps extends PropsWithChildren {
      className?: string;
    }
    interface ScrollViewProps extends PropsWithChildren {
      className?: string;
    }
    interface ImageProps {
      className?: string;
    }
    interface FlatListProps<ItemT> {
      className?: string;
      contentContainerClassName?: string;
    }
  }
}

export {};
