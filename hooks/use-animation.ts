/**
 * Custom Animation Hooks
 * Reusable animation logic for React components
 */

import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import {
  fadeInAnimation,
  scaleAnimation,
  slideInAnimation,
  bounceAnimation,
  pulseAnimation,
  rotateAnimation,
  shakeAnimation,
} from "@/lib/animations/animation-utils";

/**
 * useFadeIn Hook
 * Automatically fade in component on mount
 */
export const useFadeIn = (duration = 300, autoStart = true) => {
  const { opacity, animate } = fadeInAnimation(duration);

  useEffect(() => {
    if (autoStart) {
      animate();
    }
  }, [autoStart]);

  return { opacity, animate };
};

/**
 * useScalePress Hook
 * Handle button press with scale animation
 */
export const useScalePress = () => {
  const { scale, animateTo } = scaleAnimation(1, 0.95, 100);

  const onPressIn = () => {
    animateTo(0.95);
  };

  const onPressOut = () => {
    animateTo(1);
  };

  return { scale, onPressIn, onPressOut };
};

/**
 * useSlideIn Hook
 * Slide in animation on mount
 */
export const useSlideIn = (
  direction: "left" | "right" | "top" | "bottom" = "bottom",
  distance = 100,
  duration = 400,
  autoStart = true
) => {
  const { position, animate, getTransformStyle } = slideInAnimation(
    direction,
    distance,
    duration
  );

  useEffect(() => {
    if (autoStart) {
      animate();
    }
  }, [autoStart]);

  return { position, animate, getTransformStyle };
};

/**
 * useBounce Hook
 * Bounce animation for emphasis
 */
export const useBounce = (duration = 600, autoStart = false) => {
  const { scale, animate } = bounceAnimation(duration);

  useEffect(() => {
    if (autoStart) {
      animate();
    }
  }, [autoStart]);

  return { scale, animate };
};

/**
 * usePulse Hook
 * Continuous pulsing effect
 */
export const usePulse = (
  minOpacity = 0.5,
  maxOpacity = 1,
  duration = 1500,
  autoStart = true
) => {
  const { opacity, startPulsing } = pulseAnimation(minOpacity, maxOpacity, duration);

  useEffect(() => {
    if (autoStart) {
      startPulsing();
    }
  }, [autoStart]);

  return { opacity, startPulsing };
};

/**
 * useRotate Hook
 * Continuous rotation for loading
 */
export const useRotate = (duration = 2000, autoStart = true) => {
  const { rotation, rotateInterpolate, startRotating } = rotateAnimation(duration);

  useEffect(() => {
    if (autoStart) {
      startRotating();
    }
  }, [autoStart]);

  return { rotation, rotateInterpolate, startRotating };
};

/**
 * useShake Hook
 * Shake animation for errors
 */
export const useShake = (duration = 400) => {
  const { translateX, animate } = shakeAnimation(duration);

  return { translateX, animate };
};

/**
 * useScrollAnimation Hook
 * Bind animation to scroll position
 */
export const useScrollAnimation = () => {
  const scrollValue = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollValue } } }],
    { useNativeDriver: false }
  ) as any;

  return { scrollValue, handleScroll };
};

/**
 * useDelayedAnimation Hook
 * Delay animation start by specified duration
 */
export const useDelayedAnimation = (
  animationFn: () => void,
  delay = 500,
  autoStart = true
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoStart) {
      timeoutRef.current = setTimeout(() => {
        animationFn();
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoStart, delay, animationFn]);

  return { cancel: () => timeoutRef.current && clearTimeout(timeoutRef.current) };
};

/**
 * useSequentialAnimation Hook
 * Run multiple animations in sequence
 */
export const useSequentialAnimation = (
  animations: Array<() => void>,
  autoStart = true
) => {
  const currentIndex = useRef(0);

  const runNext = () => {
    if (currentIndex.current < animations.length) {
      animations[currentIndex.current]();
      currentIndex.current++;
    }
  };

  useEffect(() => {
    if (autoStart) {
      runNext();
    }
  }, [autoStart]);

  return { runNext, reset: () => (currentIndex.current = 0) };
};
