import { ImageRequireSource } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Exercise: { exercise: Exercise };
};

export interface Exercise {
  label: string;
  image: ImageRequireSource | null;
  numOfProjects: number | null;
}

export interface Project {
  label: string;
  image: ImageRequireSource | null;
  numOfStars: number | null;
  time: number | null;
}
