import { useLocation } from "react-router-dom";

export const useMatchURL = (url: string) => {
  const { pathname } = useLocation();
  return pathname === url;
};
