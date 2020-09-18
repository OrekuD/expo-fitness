import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const SLIDE_WIDTH = width * 0.85;
const PROJECT_CARD_WIDTH = width * 0.75;

export { width, height, SLIDE_WIDTH, PROJECT_CARD_WIDTH };
