import { Box, ChakraComponent } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
  as?: ChakraComponent<"div">;
  small?: boolean;
  big?: boolean;
  title?: string;
}

export const Logo = ({ as, title, small, big, ...rest }: Props) => {
  const Component = as || Box;

  const fontSize = useMemo(() => {
    if (small && !big) {
      return "md";
    }

    if (!small && big) {
      return "2xl";
    }

    return "lg";
  }, [small, big]);

  return (
    <Component fontSize={fontSize} fontWeight='bold' {...rest}>
      {title}
    </Component>
  );
};

Logo.defaultProps = {
  title: "Logo",
};
