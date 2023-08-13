import { Footer, Header } from "@/components";
import { Box } from "@chakra-ui/react";

interface LayoutInterface {
  children: any;
}

export const Layout = ({ children }: LayoutInterface) => {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
