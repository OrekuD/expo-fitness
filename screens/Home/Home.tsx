import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { Text, View, StyleSheet, FlatList, Animated } from "react-native";
import { SLIDE_WIDTH, width } from "../../constants/Layout";
import { exercises } from "../../data/exercises";
import { RootStackParamList } from "../../types";
import Card from "./Card";

const spacer = (width - SLIDE_WIDTH) / 2;

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={[
          { key: "90", label: "first", image: null, numOfProjects: null },
          ...exercises,
          { key: "60", label: "last", image: null, numOfProjects: null },
        ]}
        keyExtractor={({ key }) => key}
        horizontal
        snapToInterval={SLIDE_WIDTH}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => {
          if (item.label === "last" || item.label === "first") {
            return <View style={{ width: spacer }} />;
          } else {
            return (
              <Card
                exercise={item}
                navigation={navigation}
                scrollX={scrollX}
                index={index}
              />
            );
          }
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
