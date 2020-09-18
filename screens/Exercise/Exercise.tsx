import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { height } from "../../constants/Layout";
import { RootStackParamList } from "../../types";

const Exercise = ({
  route: { params },
}: StackScreenProps<RootStackParamList, "Exercise">) => {
  const {
    exercise: { image, label, numOfProjects },
  } = params;
  return (
    <View style={styles.container}>
      <SharedElement id={`exercise ${label}`}>
        <Image source={image!} resizeMode="cover" style={styles.image} />
      </SharedElement>
      <SharedElement id={`exercise ${numOfProjects}`} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}></View>
      </SharedElement>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: height * 0.4,
  },
});
