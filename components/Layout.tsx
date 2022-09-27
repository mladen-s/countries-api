import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { setDark } from "../redux/themeSlice";
import { JSONValue } from "../interface";

interface ILayout {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
}

function Layout({ children }: ILayout) {
  const dispatch = useDispatch();
  const theme = useSelector((state: JSONValue) => state.theme.value);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === undefined) {
      dispatch(setDark(prefersDark));
      setIsDark(prefersDark);
    }
  }, [theme, isDark]);

  return (
    <div className={theme !== undefined && isDark ? "dark" : ""}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      {children}
      <footer className="element container footer">
        <p>Created by Mladen Stankovic, 2022</p>
        <p>
          Challenge from{" "}
          <a href="https://www.frontendmentor.io"> www.frontendmentor.io</a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
