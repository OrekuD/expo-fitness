import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
