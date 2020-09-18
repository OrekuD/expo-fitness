import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { PROJECT_CARD_WIDTH, SLIDE_WIDTH } from "../../constants/Layout";
import { Project } from "../../types";

interface CardProps {
  project: Project;
  translateX: Animated.Value;
}

const Card = ({ project, translateX }: CardProps) => {
  const { image, numOfStars, label, time } = project;

  return (
    <Animated.View style={{ ...styles.container, transform: [{ translateX }] }}>
      <View style={styles.card}>
        <Image source={image!} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.time}>{time} mins</Text>
          </View>
          <View style={styles.stars}>
            {Array(numOfStars)
              .fill(0)
              .map((_, index) => (
                <FontAwesome
                  name="star"
                  color="gold"
                  size={18}
                  style={{ marginRight: index === numOfStars! - 1 ? 0 : 5 }}
                  key={index}
                />
              ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: PROJECT_CARD_WIDTH,
    alignItems: "center",
  },
  card: {
    width: "95%",
    height: PROJECT_CARD_WIDTH * 1.3,
    backgroundColor: "#F7F7F7",
    elevation: 1,
  },
  image: {
    width: "80%",
    height: PROJECT_CARD_WIDTH * 0.9,
    alignSelf: "center",
    marginTop: 35,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 3,
  },
  time: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "grey",
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
});
