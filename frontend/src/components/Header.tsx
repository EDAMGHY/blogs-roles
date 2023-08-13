import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  useColorMode,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { Links } from "@/utils"
import { Container } from "@/elements"
import { useMatchURL } from "@/hooks"
import { Logo } from "./Logo"

interface Props {
  title: string
  url: string
}

const NavLink = ({ title, url }: Props) => {
  const match = useMatchURL(url)

  return (
    <Link to={url}>
      <Box
        px={{ base: 4 }}
        py={{ base: 3, md: 2 }}
        textAlign={"center"}
        rounded={"md"}
        cursor={"pointer"}
        bg={useColorModeValue(
          match ? "gray.200" : "transparent",
          match ? "gray.700" : "transparent",
        )}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {title}
      </Box>
    </Link>
  )
}

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container py={4} spacing={4} justify={"space-between"} align={"center"}>
        <Flex
          w={"full"}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/"}>
              <Logo big />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} {...link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box w={"full"} pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} {...link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  )
}
