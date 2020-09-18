import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Home, Exercise } from "../screens";

const RootStack = createSharedElementStackNavigator<RootStackParamList>();

const RootNavigation = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Home" component={Home} />
    <RootStack.Screen
      name="Exercise"
      component={Exercise}
      options={{
        gestureEnabled: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}
      sharedElementsConfig={(route) => {
        const { exercise } = route.params;
        return [
          `exercise ${exercise.label}`,
          `exercise ${exercise.numOfProjects}`,
        ];
      }}
    />
  </RootStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <RootNavigation />
  </NavigationContainer>
);

export default Navigation;
