"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Children } from "react";
import theme from "./theme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <CacheProvider>{children}</CacheProvider>
    </ChakraProvider>
  );
};
