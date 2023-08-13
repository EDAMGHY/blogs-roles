import { Container as Contr, Stack, ContainerProps } from "@chakra-ui/react"

export const Container = ({ children, ...rest }: ContainerProps) => {
  return (
    <Contr
      as={Stack}
      maxW={{ sm: "xl", md: "2xl", lg: "4xl", xl: "6xl" }}
      {...rest}
    >
      {children}
    </Contr>
  )
}
