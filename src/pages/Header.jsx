import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { HiMiniHome } from "react-icons/hi2";
import { BsPencilSquare } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";


const Header = () => {
  const location = useLocation();
  const nav = useNavigate();

  const userData = useSelector((state) => state?.user?.user_info);

  return (
    <div
      className={`z-50 px-5 py-3 flex rounded-lg justify-between items-center`}
    >
      {/* left side */}
      <div className="flex gap-3 items-center text-lg text-gray-400 dark:text-white">
        <HiMiniHome />
        <p>{location?.pathname?.split("/").join(" / ")}</p>
      </div>
      {/* right side */}
      <div className="flex items-center text-gray-600 text-xl gap-5 dark:text-white">
        <div className="flex gap-3 items-center">
          <BsPersonCircle />
          <p className="text-base">{userData?.data?.username}</p>
        </div>
        {/* Setting  */}
        <p
          data-tooltip-id="setting"
          data-tooltip-content="setting"
          data-tooltip-variant="success"
        >
          <Link to={"/setting"}>
            <AiFillSetting />
          </Link>
        </p>
        <Tooltip id="setting" />
        {/* hash tag  */}
        <p
          data-tooltip-id="hashtag"
          data-tooltip-content="hashtag"
          data-tooltip-variant="success"
        >
          <Link to={"/hashtag"}>
            <FaHashtag />
          </Link>
        </p>
        <Tooltip id="hashtag" />

        <button
          onClick={() => nav("create")}
          className="cursor-pointer group flex justify-center items-center gap-3 px-5 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white text-base font-bold shadow-lg transition-all hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
        >
          <BsPencilSquare className="text-xl group-hover:animate-bounce" />
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default Header;
