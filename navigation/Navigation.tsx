import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Home, Exercise } from "../screens";

const HomeStack = createSharedElementStackNavigator<RootStackParamList>();

const HomeNavigation = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
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
        return [`image ${exercise.key}`, `content ${exercise.key}`];
      }}
    />
  </HomeStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <HomeNavigation />
  </NavigationContainer>
);

export default Navigation;
