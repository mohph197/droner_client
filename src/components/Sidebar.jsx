import React, { useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import Activity from "./Activity";

function Sidebar() {
  const [selectedOption, setSelectedOption] = React.useState("Activity");
  const options = ["Units", "Activity", "Alerts"];

  return (
    <div className="px-2 py-4 bottom-0 w-96 h-[calc(100vh-41px)] border-r border-r-black">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col-reverse gap-4">
          <div className="flex justify-center gap-6">
            {options.map((option) => (
              <HStack
                key={option}
                spacing={4}
                className={`${
                  selectedOption === option && "font-bold text-black"
                } cursor-pointer rounded-md`}
                onClick={() => setSelectedOption(option)}
              >
                <span>{option}</span>
              </HStack>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <input
              placeholder="Search"
              className="py-2 px-4 border border-black rounded-md w-full"
            />
          </div>
        </div>
        <div>
          <Activity />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
