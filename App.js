import React from "react";
import { StyleSheet, Button, View, Text, SafeAreaView } from "react-native";

import Card from "./Card";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function App() {
  const boxOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: boxOpacity.value,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.leftTopView, animatedStyle]} />
      <Card boxOpacity={boxOpacity} />
      <Card boxOpacity={boxOpacity} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  leftTopView: {
    position: "absolute",
    left: 0,
    top: 48,
    backgroundColor: "blue",
    width: 100,
    height: 100,
  },
});
