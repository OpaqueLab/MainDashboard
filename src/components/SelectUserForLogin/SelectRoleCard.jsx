import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
const SelectRoleCard = ({ el, setActive }) => {
  // console.log(el)
  const fakeData = [
    { id: 1, name: "John Doe", role: "admin" },
    { id: 2, name: "Jane Smith", role: "editor" },
    { id: 3, name: "Alice Johnson", role: "author" },
    { id: 4, name: "Bob Williams", role: "developer" },
    { id: 5, name: "Eva Davis", role: "production" },
    { id: 6, name: "Michael Brown", role: "admin" },
    { id: 7, name: "Olivia Wilson", role: "editor" },
    { id: 8, name: "William Moore", role: "author" },
    { id: 9, name: "Sophia Taylor", role: "developer" },
    { id: 10, name: "James Anderson", role: "production" },
    { id: 11, name: "Emma Jackson", role: "admin" },
    { id: 12, name: "Liam Martinez", role: "editor" },
    { id: 13, name: "Ava Garcia", role: "author" },
    { id: 14, name: "Noah Rodriguez", role: "developer" },
    { id: 15, name: "Isabella Lopez", role: "production" },
    { id: 16, name: "Mia Lee", role: "admin" },
  ];

  // fileter base on role
  const filteredData = fakeData.filter((item) => item.role === el.role);

  return (
    <div className="flex items-center gap-5">
      {/* main card  */}
      <div
        onClick={() => setActive(el?.id)}
        className=" w-48 h-40 flex justify-center items-center rounded-md bg-white group relative overflow-hidden"
      >
        {/* logo  */}
        <img className="p-5" src="../../../public/logotext.svg" alt="" />
        {/* information  */}
        <div
          className={`text-sm absolute ${
            el?.active ? "translate-y-0" : "translate-y-14"
          } group-hover:translate-y-0  left-5 bottom-2 transition duration-200 text-slate-100 z-20 cursor-pointer `}
        >
          <p className="text-lg font-bold">{el?.title}</p>
          <p className="flex items-center">
            Click to select your role
            <BsArrowRightShort />
          </p>
        </div>
        {/* gradient effect  */}
        <div
          className={`w-full h-full absolute user_role_card ${
            el?.active ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100 transition duration-200`}
        ></div>
      </div>
      {/* open slide card when active  */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          el.active ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex gap-5 overflow-hidden"
      >
        {el.active &&
          filteredData.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white w-40 h-24 cursor-pointer hover:bg-zinc-200 hover:text-black flex flex-col items-center justify-center rounded-md"
            >
              {user.name}
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default SelectRoleCard;
