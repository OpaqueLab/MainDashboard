import React, { useEffect, useState } from "react";
import Sidebar from "./pages/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header";
import ThemeBtn from "./components/Theme/ThemeBtn";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const iconToggle = () => {
    setDarkMode(!darkMode);
  };
  const ThemeCheck = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
      return;
    }
    setDarkMode(false);
  };

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
  };

  useEffect(() => {
    ThemeCheck();
  }, []);
  return (
    <div className="flex min-h-screen dark:bg-primary">
      {/* Light/Dark Theme Btn */}
      <ThemeBtn
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        themeSwitch={themeSwitch}
      />
      <div className="w-1/6 fixed">
        <Sidebar darkMode={darkMode}/>
      </div>
      <div className="flex flex-col w-5/6 ml-[16.6%]">
        <Header />
        <div className="p-10">{<Outlet />}</div>

      </div>
    </div>
  );
};

export default Layout;
