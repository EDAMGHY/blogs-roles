"use client"

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa"
import { ReactNode } from "react"
import { Links } from "@/utils"
import { Container as Contr } from "@/elements"
import { Link } from "react-router-dom"
import { Logo } from "./Logo"

interface SocialButtonProps {
  children: ReactNode
  label: string
  href: string
}

const SocialButton = ({ children, label, href }: SocialButtonProps) => {
  return (
    <Link to={href} target="_blank">
      <chakra.button
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    </Link>
  )
}

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Contr
        as={Stack}
        maxW={{ sm: "xl", md: "2xl", lg: "4xl", xl: "6xl" }}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Link to={"/"}>
          <Logo />
        </Link>
        <Stack direction={"row"} spacing={6}>
          {Links.map((link, index) => (
            <Link key={index} to={link?.url}>
              {link?.title}
            </Link>
          ))}
        </Stack>
      </Contr>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© {new Date().getFullYear()} All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Website"}
              href={"https://damriabdellah.netlify.app"}
            >
              <FaGlobe />
            </SocialButton>
            <SocialButton
              label={"Linkedin"}
              href={"https://linkedin.com/in/abdellah-damri"}
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={"Github"} href={"https://github.com/EDAMGHY"}>
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
