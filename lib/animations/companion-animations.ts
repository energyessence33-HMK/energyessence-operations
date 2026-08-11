import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

export const useCompanionBreathing = () => {
  const breathe = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(breathe.value, [0, 1], [0.95, 1.05], Extrapolate.CLAMP);
    const opacity = interpolate(breathe.value, [0, 1], [0.8, 1], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const startBreathing = () => {
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  return { animatedStyle, startBreathing };
};

export const useCompanionGlow = () => {
  const glow = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(glow.value, [0, 1], [0.3, 0.8], Extrapolate.CLAMP);

    return {
      shadowOpacity,
      shadowRadius: interpolate(glow.value, [0, 1], [10, 25], Extrapolate.CLAMP),
    };
  });

  const startGlow = () => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  return { animatedStyle, startGlow };
};

export const useCompanionBlink = () => {
  const blink = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(blink.value, [0, 0.5, 1], [1, 0.1, 1], Extrapolate.CLAMP);

    return {
      transform: [{ scaleY }],
    };
  });

  const triggerBlink = () => {
    blink.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
    blink.value = withTiming(0, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const startBlinking = (interval: number = 4000) => {
    setInterval(() => {
      triggerBlink();
    }, interval);
  };

  return { animatedStyle, triggerBlink, startBlinking };
};

export const useCompanionFloat = () => {
  const float = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(float.value, [0, 1], [0, -10], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  const startFloating = () => {
    float.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  return { animatedStyle, startFloating };
};

export const useCompanionPulse = () => {
  const pulse = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.1], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
    };
  });

  const triggerPulse = () => {
    pulse.value = withSequence(
      withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) }),
      withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) })
    );
  };

  return { animatedStyle, triggerPulse };
};

export const useCompanionShimmer = () => {
  const shimmer = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 1], [0.5, 1], Extrapolate.CLAMP);

    return {
      opacity,
    };
  });

  const startShimmering = () => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  return { animatedStyle, startShimmering };
};

export const useCompanionRotate = () => {
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotate.value, [0, 1], [0, 360], Extrapolate.CLAMP);

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const triggerRotate = () => {
    rotate.value = withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const startContinuousRotate = () => {
    rotate.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
  };

  return { animatedStyle, triggerRotate, startContinuousRotate };
};

export const useCompanionBounce = () => {
  const bounce = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(bounce.value, [0, 0.5, 1], [0, -20, 0], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  const triggerBounce = () => {
    bounce.value = withSequence(
      withTiming(0.5, { duration: 300, easing: Easing.out(Easing.bounce) }),
      withTiming(1, { duration: 300, easing: Easing.in(Easing.bounce) })
    );
  };

  return { animatedStyle, triggerBounce };
};

export const useCompanionWave = () => {
  const wave = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(wave.value, [0, 1], [0, 15], Extrapolate.CLAMP);

    return {
      transform: [{ rotateZ: `${rotateZ}deg` }],
      transformOrigin: "right center",
    };
  });

  const triggerWave = () => {
    wave.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) }),
      withTiming(0, { duration: 200, easing: Easing.in(Easing.ease) })
    );
  };

  return { animatedStyle, triggerWave };
};

export const useCompanionSparkle = () => {
  const sparkle = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(sparkle.value, [0, 0.5, 1], [0, 1.2, 0], Extrapolate.CLAMP);
    const opacity = interpolate(sparkle.value, [0, 0.5, 1], [0, 1, 0], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const triggerSparkle = () => {
    sparkle.value = withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return { animatedStyle, triggerSparkle };
};

export const useCompanionReactions = () => {
  const reactions = {
    breathing: useCompanionBreathing(),
    glow: useCompanionGlow(),
    blink: useCompanionBlink(),
    float: useCompanionFloat(),
    pulse: useCompanionPulse(),
    shimmer: useCompanionShimmer(),
    rotate: useCompanionRotate(),
    bounce: useCompanionBounce(),
    wave: useCompanionWave(),
    sparkle: useCompanionSparkle(),
  };

  return reactions;
};
