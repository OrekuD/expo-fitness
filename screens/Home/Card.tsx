import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { SLIDE_WIDTH } from "../../constants/Layout";
import { profiles } from "../../data/profiles";
import { Exercise, RootStackParamList } from "../../types";

interface CardProps {
  exercise: Exercise;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  scrollX: Animated.Value;
  index: number;
}

const Card = ({ exercise, navigation, scrollX, index }: CardProps) => {
  const { image, numOfProjects, label, key } = exercise;
  const inputRange = [
    (index - 2) * SLIDE_WIDTH,
    (index - 1) * SLIDE_WIDTH,
    index * SLIDE_WIDTH,
  ];

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [SLIDE_WIDTH * 0.1, 0, SLIDE_WIDTH * 0.1],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1.25, 1, 1.25],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <RectButton
        style={styles.card}
        onPress={() => navigation.push("Exercise", { exercise })}
      >
        <SharedElement id={`image ${key}`} style={styles.imageContainer}>
          <Animated.Image
            source={image!}
            resizeMode="cover"
            style={{
              ...styles.image,
              transform: [{ translateX }, { scale }],
            }}
          />
        </SharedElement>
        <View style={styles.cardContent}>
          <SharedElement id={`content ${key}`} style={{ flex: 1 }}>
            <View style={styles.wrapper} />
          </SharedElement>
          <View style={styles.content}>
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.projects}>{numOfProjects} projects</Text>
            </View>
            <View style={styles.profiles}>
              {profiles.map((image, index) => (
                <View
                  style={{ ...styles.profile, zIndex: profiles.length - index }}
                  key={index}
                >
                  <Image
                    style={{ ...styles.profileImage }}
                    resizeMode="cover"
                    source={image}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </RectButton>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: SLIDE_WIDTH,
    alignItems: "center",
  },
  card: {
    width: SLIDE_WIDTH * 0.96,
    height: SLIDE_WIDTH * 1.3,
    backgroundColor: "white",
    elevation: 2,
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
    width: "100%",
    height: "100%",
  },
  cardContent: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 3,
    textTransform: "capitalize",
  },
  projects: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "grey",
  },
  profiles: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 42,
    height: 42,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    marginLeft: -10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
