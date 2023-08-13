import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"

export const Link = ({
  href = "#",
  children = "See More",
  ...rest
}: LinkProps) => {
  return (
    <ChakraLink
      display={"inline-block"}
      textDecoration={"CaptionText"}
      as={ReactRouterLink}
      to={href}
      {...rest}
    >
      {children}
    </ChakraLink>
  )
}
