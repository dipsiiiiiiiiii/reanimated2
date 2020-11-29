import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  runOnUI,
  withSpring,
  repeat,
  Easing,
  withTiming,
  delay,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Card({ boxOpacity }) {
  const isPanStarted = useSharedValue(false);
  const isSaved = useSharedValue(false);

  const defaultTranslationY = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isPanStarted.value = true;
      ctx.offsetX = translationX.value;
      ctx.offsetY = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.offsetX + event.translationX;
      translationY.value = ctx.offsetY + event.translationY;
      const isIntheBox = translationX.value < -85 && translationY.value < -288;
      boxOpacity.value = isIntheBox ? 0.3 : 1;
    },
    onEnd: _ => {
      const isIntheBox = translationX.value < -85 && translationY.value < -288;
      translationY.value = repeat(
        withTiming(translationY.value + 10, {
          duration: 500,
        }),
        -1,
        true
      );
      isSaved.value = isIntheBox ? true : false;
    },
    onFinish: () => {
      boxOpacity.value = 1;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        {
          translateY: isPanStarted.value
            ? translationY.value
            : defaultTranslationY.value,
        },
      ],
      display: isSaved.value ? "none" : "flex",
    };
  });

  useEffect(() => {
    defaultTranslationY.value = repeat(
      withTiming(defaultTranslationY.value - 10, { duration: 500 }),
      -1,
      true
    );
  }, []);

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    // position: "absolute",
    margin: 8,
  },
});
