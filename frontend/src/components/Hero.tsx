import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react"
import { Button, Container } from "@/elements"

export const Hero = () => {
  return (
    <Box
      h={{
        base: "calc(100vh - 168px - 164px)",
        md: "calc(100vh - 128px - 164px)",
      }}
    >
      <Container h={"full"} paddingInline={0} paddingBlock={10}>
        <Flex
          h={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          maxW={"3xl"}
          marginInline={"auto"}
          flexDirection={"column"}
          gap={"40px"}
        >
          <Heading textAlign={"center"} size={"4xl"} color={"blue.400"}>
            Stay Focused...
          </Heading>
          <Text align={"center"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            eveniet! Esse fugiat excepturi totam, maxime sapiente atque vitae
            nisi sunt sequi. Tenetur aliquid fugit ab!
          </Text>
          <Button href="/blogs" colorScheme={"blue"}>
            View Blogs
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
