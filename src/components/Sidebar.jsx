import React, { useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import Activity from "./sidebarElements/Activity";

function Sidebar() {
  const [selectedOption, setSelectedOption] = React.useState("Activity");
  const options = [
    {
      name: "Units",
      component: <div>Units</div>,
    },
    {
      name: "Activity",
      component: <Activity />,
    },
    {
      name: "Alerts",
      component: <div>Alerts</div>,
    },
  ];

  return (
    <div className="px-2 py-4 bottom-0 w-96 h-[calc(100vh-41px)] border-r border-r-black overflow-y-scroll">
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-center gap-6">
          {options.map((option) => (
            <HStack
              key={option.name}
              spacing={4}
              className={`${
                selectedOption === option.name && "font-bold text-black"
              } cursor-pointer rounded-md`}
              onClick={() => {
                setSelectedOption(option.name);
              }}
            >
              <span>{option.name}</span>
            </HStack>
          ))}
        </div>

        <div>
          {options.find((option) => option.name === selectedOption).component}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
