"use client";

import { Box, Text } from "@chakra-ui/react";

type CardProps = {
  id: string;
  name: string;
};

const Card: React.FC<CardProps> = ({ id, name }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
    </Box>
  );
};

export default Card;
