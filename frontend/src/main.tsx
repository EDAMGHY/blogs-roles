import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import { BrowserRouter as Router } from "react-router-dom"

import theme from "./theme"

const container = document.getElementById("root")
if (!container) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
