import { Route, Routes } from "react-router-dom"
import { Layout } from "@/globals"
import { Container } from "@/elements"
import {
  Home,
  Dashboard,
  Register,
  Login,
  ErrorPage,
  About,
  Blogs,
} from "@/pages"

const App = () => {
  return (
    <Layout>
      <Container py={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </Layout>
  )
}

export default App
