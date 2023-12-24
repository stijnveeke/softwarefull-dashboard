"use client";
import {
  Box,
  Text,
  HStack,
  Icon,
  Link,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  VisuallyHidden,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiHome, FiInfo, FiMail } from "react-icons/fi";
import { VscMultipleWindows } from "react-icons/vsc";
import { FaRunning } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const staticSites = [
  {
    favIcon: "/favicon.ico",
    itemName: "Dierenmanieren.nl",
    link: "/sites",
  },
  {
    favIcon: "/favicon.ico",
    itemName: "Sites",
    link: "/sites",
  },
];

const SidebarContent = () => {
  const [accordionIndex, setAccordionIndex] = React.useState(-1);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="flex flex-col justify-between h-full">
      <VStack spacing="4" align="start">
        <Link href="/">
          <Button
            {...(colorMode === "light"
              ? { colorScheme: "primary" }
              : { color: "white" })}
          >
            <HStack>
              <Icon as={FiHome} boxSize="6" />
              <Text>Home</Text>
            </HStack>
          </Button>
        </Link>
        <Accordion allowToggle index={[accordionIndex]}>
          <AccordionItem border={0}>
            <Button
              {...(colorMode === "light"
                ? { colorScheme: "primary" }
                : { color: "white" })}
              onClick={() => {
                setAccordionIndex(accordionIndex === 0 ? -1 : 0);
              }}
            >
              <HStack>
                <Icon as={VscMultipleWindows} boxSize="6" />
                <Text>Sites</Text>
              </HStack>
              <AccordionIcon />
            </Button>
            <VisuallyHidden>
              <AccordionButton></AccordionButton>
            </VisuallyHidden>
            <AccordionPanel pl={2} pb={2}>
              <VStack align={"start"}>
                {staticSites.map((item, index) => {
                  return (
                    <Link href={item.link} key={index}>
                      <Button
                        {...(colorMode === "light"
                          ? { colorScheme: "primary" }
                          : { color: "white" })}
                      >
                        <HStack>
                          <Icon as={FiHome} boxSize="6" />
                          <Text>{item.itemName}</Text>
                        </HStack>
                      </Button>
                    </Link>
                  );
                })}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>

      {/* Added section for displaying links */}
      <VStack spacing="4" align="start" mt={"auto"} mb={4}>
        <Button
          {...(colorMode === "light"
            ? { colorScheme: "primary" }
            : { color: "white" })}
          onClick={toggleColorMode}
        >
          <HStack>
            <Icon
              as={colorMode === "light" ? MdDarkMode : MdLightMode}
              boxSize="6"
            />
            <Text>{colorMode === "light" ? "Dark mode" : "Light mode"}</Text>
          </HStack>
        </Button>
        <Link href="/contact">
          <Button
            {...(colorMode === "light"
              ? { colorScheme: "primary" }
              : { color: "white" })}
          >
            <HStack>
              <Icon as={FaRunning} boxSize="6" />
              <Text>Logout</Text>
            </HStack>
          </Button>
        </Link>
      </VStack>
    </div>
  );
};

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        w="64"
        p="4"
        h="full"
        bg={colorMode === "light" ? "primary" : "black"}
      >
        <SidebarContent />
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Menu>
          <div
            style={{
              position: "fixed",
              top: "40%",
              left: 0,
              backgroundColor: "transparent",
              zIndex: 99,
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              padding: "2px",
            }}
            className="border-2 border-black border-l-0 rounded-r-md"
          >
            <VStack spacing="2" align="start" onClick={onOpen}>
              <Icon as={FiHome} boxSize="5" color={"black"} />
              <Icon as={VscMultipleWindows} boxSize="5" color={"black"} />
            </VStack>
          </div>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
            <DrawerOverlay>
              <DrawerContent bg="primary">
                {" "}
                {/* Set the background color to black */}
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <SidebarContent />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Menu>
      </Box>
    </>
  );
};

export default Sidebar;
