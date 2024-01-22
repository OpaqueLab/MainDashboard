import React, { useState } from "react";
import SelectRoleCard from "./SelectRoleCard";
import Pin from "../PinForLogin/Pin";

const User = () => {
  const [userRoles, setUserRoles] = useState([
    {
      id: 1,
      role: "admin",
      title: "Admin",
      active: false,
    },
    {
      id: 2,
      role: "editor",
      title: "Editor",
      active: false,
    },
    {
      id: 3,
      role: "author",
      title: "Author",
      active: false,
    },
    {
      id: 4,
      role: "developer",
      title: "Developer",
      active: false,
    },
    {
      id: 5,
      role: "production",
      title: "Production",
      active: false,
    },
  ]);

  const handleSetActive = (id) => {
    const updatedRoles = userRoles.map((role) => {
      if (role.id === id) {
        return { ...role, active: true };
      } else {
        return { ...role, active: false };
      }
    });

    setUserRoles(updatedRoles);
  };

  return (
    <div className="grid grid-cols-10 h-[100vh] bg-gradient-to-br from-slate-950 to-zinc-900">
      {/* showing role block  */}
      <div className="flex flex-col justify-between px-10 py-5 col-span-6">
        {userRoles?.map((el) => {
          return (
            <SelectRoleCard
              key={el.id}
              el={el}
              setActive={handleSetActive}
            />
          );
        })}
      </div>
      {/* requesting pin  */}
      <div className="col-span-4 flex items-center justify-center">
        <Pin/>
      </div>
    </div>
  );
};

export default User;
