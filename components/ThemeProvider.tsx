import React, { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setDark } from "../redux/themeSlice";

interface Props {
  children: React.ReactNode;
}
export const ThemeProvider = ({ children }: Props) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dispatch = useDispatch();
  dispatch(setDark(prefersDark));

  const [theme, setTheme] = useState(prefersDark);
  /* Note: Initial state is set upon mounting, hence is better 
    to put the <ThemeProvider> up in your tree, close to the root <App> 
    to avoid unmounting it with the result of reverting to the default user 
    preference when and if re-mounting (unless you want that behaviour) */

  const applyTheme = () => {};
  useLayoutEffect(() => {
    /* You end up here only when the user takes action
          to change the theme, hence you can just apply the new theme. */
    applyTheme();
  }, [theme]);

  return <div>{children}</div>;
};
