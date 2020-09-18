import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { SLIDE_WIDTH } from "../../constants/Layout";
import { Exercise, RootStackParamList } from "../../types";

interface CardProps {
  exercise: Exercise;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  scrollX: Animated.Value;
  index: number;
}

const Card = ({ exercise, navigation, scrollX, index }: CardProps) => {
  const { image, numOfProjects, label } = exercise;
  const inputRange = [
    (index - 2) * SLIDE_WIDTH,
    (index - 1) * SLIDE_WIDTH,
    index * SLIDE_WIDTH,
  ];

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [SLIDE_WIDTH * 0.2, 0, SLIDE_WIDTH * 0.2],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1.2, 1, 1.2],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={1}
        onPress={() => navigation.push("Exercise", { exercise })}
      >
        <SharedElement id={`exercise ${label}`} style={styles.imageContainer}>
          <Animated.Image
            source={image!}
            resizeMode="cover"
            style={{
              ...styles.image,
              transform: [{ translateX }, { scale }],
            }}
          />
        </SharedElement>
        <SharedElement id={`exercise ${numOfProjects}`} style={{ flex: 1 }}>
          <View style={styles.content}></View>
        </SharedElement>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: SLIDE_WIDTH,
    height: SLIDE_WIDTH * 1.3,
    alignItems: "center",
  },
  card: {
    width: SLIDE_WIDTH * 0.96,
    height: "100%",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: SLIDE_WIDTH,
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: "relative",
  },
});
