import React from "react";
import { useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const detail = useSelector((state) => state?.blog?.detailBlog);
  const nav = useNavigate();
  console.log(detail);
  return (
    <div className="bg-slate-900 p-5 flex flex-col justify-between h-[100vh] scrollbar-none overflow-scroll">
      <button
        onClick={() => nav(-1)}
        className="px-5 py-2 bg-green-500 text-white mb-5"
      >
        Back
      </button>
      {/* Main Image,Title,Author,Date,Program */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-12 items-center gap-5 bg-slate-800/30 border border-slate-50/20 rounded-md p-5">
        {/* Left */}
        <div className="col-span-12 lg:col-span-6 text-white">
          <h1 className="font-bold text-3xl lg:text-6xl lg:leading-[90px]">
            {detail?.title}
          </h1>
          <h2 className="font-semibold text-slate-300 italic my-3">
            {detail?.author}
          </h2>
          <p>
            {detail?.date}{" "}
            {detail?.programs?.length > 0 &&
              `/ ${detail?.programs?.join(", ")}`}
          </p>
        </div>
        {/* Right */}
        <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
          <img
            src={detail?.images?.url}
            alt=""
            className="w-[500px] h-[500px]"
          />
        </div>
      </div>

      {/* Description */}
      {detail?.is_unlayer ? (
        <iframe className="w-full h-full" src={`${detail?.unlayerFile?.url}`} frameborder="0"></iframe>
      ) : (
        <div className="text-white leading-8 w-[95%] md:w-[750px] mx-auto my-3 ">
          {HtmlParser(detail?.description)}
        </div>
      )}
    </div>
  );
};

export default Detail;
