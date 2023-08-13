import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      "html, body, a , button , h1 , h2 ,h3 , h4,h5 , h6": {
        fontFamily: `'Inter', sans-serif`,
      },
    },
  },
})

export default theme
