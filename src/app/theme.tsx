import { theme as chakraTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);

const theme = {
  ...chakraTheme,
  initialColorMode: "system",
  useSystemColorMode: true,
  colors: {
    ...chakraTheme.colors,
    ...tailwind.theme!.colors,
  },
  fonts: {
    ...chakraTheme.fonts,
    body: `'Inter', sans-serif`,
    heading: `'Inter', sans-serif`,
  },
  fontWeights: {
    ...chakraTheme.fontWeights,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    ...chakraTheme.lineHeights,
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
  },
  letterSpacings: {
    ...chakraTheme.letterSpacings,
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

export default theme;
