import React from "react";
import Header from "./Header";

interface ILayout {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div>
      <Header />
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
