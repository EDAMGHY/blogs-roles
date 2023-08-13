import { ButtonProps as BtnProps, Button as Btn } from "@chakra-ui/react"

import { ReactNode } from "react"
import { Link } from "../link/link"

export interface ButtonProps extends BtnProps {
  variant?: string
  href?: string
  children?: string | ReactNode
}

export const Button = ({
  href = "",
  children = "See More",
  colorScheme = "blue",
  ...rest
}: ButtonProps) => {
  let props = {}
  if (["whiteAlpha", "blackAlpha"].includes(colorScheme)) {
    props = props
  }

  if (href) {
    return (
      <Link href={href}>
        <Btn
          bg={`${colorScheme}.400`}
          _hover={{
            bg: `${colorScheme}.300`,
          }}
          colorScheme={colorScheme}
          {...rest}
        >
          {children}
        </Btn>
      </Link>
    )
  }
  return (
    <Btn
      bg={`${colorScheme}.400`}
      _hover={{
        bg: `${colorScheme}.300`,
      }}
      {...rest}
    >
      {children}
    </Btn>
  )
}
