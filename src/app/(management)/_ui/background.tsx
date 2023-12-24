"use client";
import { useColorMode } from "@chakra-ui/react";

export const Background = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();
  return (
    <div
      className={
        "h-full " +
        (colorMode === "light" ? "bg-lightBackground" : "bg-darkBackground")
      }
    >
      {children}
    </div>
  );
};

export default Background;
