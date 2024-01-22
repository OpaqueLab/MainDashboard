import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeBtn = ({ darkMode,themeSwitch }) => {
  return (
    <div
      onClick={() => themeSwitch()}
      className="fixed z-50 flex justify-center items-center bottom-5 right-5 p-4 rounded-full shadow-lg cursor-pointer group transition-colors bg-cyan-400 text-white text-xl"
    >
      {darkMode ? <BsSunFill className="group-hover:animate-spin"/> : <BsMoonFill className="group-hover:animate-pulse"/>}
    </div>
  );
};

export default ThemeBtn;
