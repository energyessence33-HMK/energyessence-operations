import { Animated, FlatList, View, FlatListProps } from "react-native";
import { useRef, useEffect } from "react";
import { useFadeIn } from "@/hooks/use-animation";

interface AnimatedListProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  itemDelay?: number;
}

export function AnimatedList<T>({
  data,
  renderItem,
  itemDelay = 50,
  ...props
}: AnimatedListProps<T>) {
  const animatedValues = useRef(
    data.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      itemDelay,
      animatedValues.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [data.length]);

  return (
    <FlatList
      {...props}
      data={data}
      renderItem={({ item, index }) => (
        <Animated.View
          style={{
            opacity: animatedValues[index],
            transform: [
              {
                translateY: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          {renderItem(item, index)}
        </Animated.View>
      )}
      keyExtractor={(_, index) => `item-${index}`}
    />
  );
}
