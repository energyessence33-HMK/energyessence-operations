/**
 * Premium Animation Utilities
 * Reusable animation configurations for elite user experience
 */

import { Animated, Easing } from "react-native";

/**
 * Fade In Animation
 * Smooth opacity transition from 0 to 1
 */
export const fadeInAnimation = (duration = 300) => {
  const opacity = new Animated.Value(0);

  const animate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { opacity, animate };
};

/**
 * Fade Out Animation
 * Smooth opacity transition from 1 to 0
 */
export const fadeOutAnimation = (duration = 300) => {
  const opacity = new Animated.Value(1);

  const animate = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { opacity, animate };
};

/**
 * Scale Animation
 * Smooth scale transformation (useful for button press effects)
 */
export const scaleAnimation = (fromValue = 1, toValue = 0.95, duration = 100) => {
  const scale = new Animated.Value(fromValue);

  const animateTo = (value: number = toValue) => {
    Animated.timing(scale, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { scale, animateTo };
};

/**
 * Slide In Animation
 * Slide from left/right/top/bottom
 */
export const slideInAnimation = (
  direction: "left" | "right" | "top" | "bottom" = "bottom",
  distance = 100,
  duration = 400
) => {
  const position = new Animated.Value(direction === "left" || direction === "right" ? distance : distance);

  const animate = () => {
    Animated.timing(position, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const getTransformStyle = () => {
    if (direction === "left") return { transform: [{ translateX: position }] };
    if (direction === "right") return { transform: [{ translateX: position }] };
    if (direction === "top") return { transform: [{ translateY: position }] };
    return { transform: [{ translateY: position }] };
  };

  return { position, animate, getTransformStyle };
};

/**
 * Bounce Animation
 * Elastic bounce effect for emphasis
 */
export const bounceAnimation = (duration = 600) => {
  const scale = new Animated.Value(0.8);

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: duration * 0.5,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: duration * 0.5,
        easing: Easing.out(Easing.elastic(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { scale, animate };
};

/**
 * Pulse Animation
 * Continuous pulsing effect for attention
 */
export const pulseAnimation = (minOpacity = 0.5, maxOpacity = 1, duration = 1500) => {
  const opacity = new Animated.Value(maxOpacity);

  const startPulsing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: minOpacity,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: maxOpacity,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return { opacity, startPulsing };
};

/**
 * Rotate Animation
 * Continuous rotation for loading spinners
 */
export const rotateAnimation = (duration = 2000) => {
  const rotation = new Animated.Value(0);

  const startRotating = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return { rotation, rotateInterpolate, startRotating };
};

/**
 * Shake Animation
 * Horizontal shake for errors or attention
 */
export const shakeAnimation = (duration = 400) => {
  const translateX = new Animated.Value(0);

  const animate = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -10,
        duration: duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 10,
        duration: duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -10,
        duration: duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration / 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { translateX, animate };
};

/**
 * Stagger Animation
 * Animate multiple items in sequence
 */
export const staggerAnimation = (
  itemCount: number,
  duration = 300,
  staggerDelay = 50
) => {
  const animations = Array.from({ length: itemCount }, () => new Animated.Value(0));

  const animate = () => {
    Animated.stagger(
      staggerDelay,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    ).start();
  };

  return { animations, animate };
};

/**
 * Parallax Animation
 * Scroll-based parallax effect
 */
export const parallaxAnimation = (scrollValue: Animated.Value, speed = 0.5) => {
  const translateY = Animated.multiply(scrollValue, speed);

  return { translateY };
};

/**
 * Timing Presets
 * Common animation durations for consistency
 */
export const AnimationTimings = {
  INSTANT: 0,
  FAST: 150,
  QUICK: 250,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
  GLACIAL: 1200,
};

/**
 * Easing Presets
 * Common easing functions for premium feel
 */
export const AnimationEasings = {
  LINEAR: Easing.linear,
  EASE_IN: Easing.in(Easing.cubic),
  EASE_OUT: Easing.out(Easing.cubic),
  EASE_IN_OUT: Easing.inOut(Easing.cubic),
  BOUNCE: Easing.bounce,
  ELASTIC: Easing.elastic(1),
  BACK: Easing.back(1.52),
};
