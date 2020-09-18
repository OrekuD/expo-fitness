import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { height, PROJECT_CARD_WIDTH, width } from "../../constants/Layout";
import { projects } from "../../data/projects";
import { RootStackParamList } from "../../types";
import Card from "./Card";

const spacer = (width - PROJECT_CARD_WIDTH) / 2;

const Exercise = ({
  route: { params },
  navigation,
}: StackScreenProps<RootStackParamList, "Exercise">) => {
  const {
    exercise: { image, key, numOfProjects },
  } = params;
  const translateX = useRef(new Animated.Value(width * 0.8)).current;
  const { top } = useSafeAreaInsets();

  const goBack = () => {
    slideRight();
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  const slideRight = () => {
    Animated.timing(translateX, {
      toValue: width * 0.8,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();
  };

  const slideLeft = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 800,
      delay: 200,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideLeft();
  }, []);

  return (
    <View style={styles.container}>
      <RectButton
        onPress={goBack}
        style={{ ...styles.closeButton, top: top * 1.5 }}
      >
        <Ionicons name="ios-close" size={35} />
      </RectButton>
      <SharedElement id={`image ${key}`}>
        <Image source={image!} resizeMode="cover" style={styles.image} />
      </SharedElement>
      <View style={{ flex: 1 }}>
        <SharedElement id={`content ${key}`} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#f8f8f8" }} />
        </SharedElement>
        <View style={styles.content}>
          <FlatList
            data={[
              { label: "first", image: null, numOfStars: null, time: null },
              ...projects,
              { label: "last", image: null, numOfStars: null, time: null },
            ]}
            keyExtractor={({ label }) => label}
            horizontal
            snapToInterval={PROJECT_CARD_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.label === "last" || item.label === "first") {
                return <View style={{ width: spacer }} />;
              } else {
                return <Card project={item} translateX={translateX} />;
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: height * 0.4,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -PROJECT_CARD_WIDTH * 0.3,
  },
});
