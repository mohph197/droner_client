import React, { useEffect, useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import Activity from "./sidebarElements/Activity";
import { useSelectedDroneContext } from "../hooks/useSelectedDroneContext";
import axios from "../config/axios";
import drone from "../assets/drones/Drone-Model-1.svg";
import { IoMdArrowRoundBack } from "react-icons/io";
import dronePng from "../assets/drones/drone.png";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("Activity");
  const [selectedData, setSelectedData] = useState(null);
  const { selectedDrone, updateSelectedDrone } = useSelectedDroneContext();
  const [selectedInfo, setSelectedInfo] = useState("battery");
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

  useEffect(() => {
    console.log(`SelectedDrone update: ${selectedDrone}`);
    if (selectedDrone) {
      axios.get(`/api/uavs/${selectedDrone}`).then((res) => {
        setSelectedData(res.data);
      });
    } else {
      setSelectedData(null);
    }
  }, [selectedDrone]);

  return (
    <div className="px-2 py-4 bottom-0 w-96 h-[calc(100vh-41px)] border-r border-r-black overflow-y-scroll">
      {selectedDrone ? (
        selectedData ? (
          <div>
            <div>
              <button
                className="flex font-bold"
                onClick={() => updateSelectedDrone(null)}
              >
                <IoMdArrowRoundBack className="text-2xl" />
                Back
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <img src={drone} alt="drone" className="w-28 h-28" />
                <div className="flex flex-col w-full">
                  <span className="text-2xl font-bold">
                    {selectedDrone.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#B9B9B9] opacity-50"></div>
              <div className="w-full flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center py-6">
                  UAV Stats
                </h1>
                <div className="flex gap-4">
                  <div
                    className={`cursor-pointer ${
                      selectedInfo === "battery" &&
                      `font-bold text-[#0073E6] underline underline-thickness:2px`
                    }`}
                    onClick={() => {
                      setSelectedInfo("battery");
                    }}
                  >
                    Battery
                  </div>
                  <div
                    className={`cursor-pointer ${
                      selectedInfo === "status" &&
                      `font-bold text-[#0073E6] underline underline-thickness:2px`
                    }`}
                    onClick={() => {
                      setSelectedInfo("status");
                    }}
                  >
                    Status
                  </div>
                </div>
                {selectedInfo === "battery" ? (
                  <div className="w-full flex flex-col items-center gap-2">
                    <img src={drone} alt="drone" className="w-28 h-28" />
                    <div className="w-[90%] flex flex-col gap-2">
                      <h1 className="font-bold">Power Status:</h1>
                      <progress
                        className="h-9 w-full self-center"
                        id={selectedData.battery.id}
                        value={selectedData.battery.voltage_level}
                        max="30"
                      ></progress>
                    </div>
                    <div className="w-[90%] mt-6 flex flex-col gap-2 items-center">
                      <div className="w-56 h-28 bg-black rounded-lg overflow-hidden">
                        <img src={dronePng} alt="drone" />
                      </div>
                    </div>
                    <button className="">Live Stream</button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* <h1>{selectedDrone}</h1>
            <h1>{selectedData["battery"]["voltage_level"]}</h1> */}
          </div>
        ) : (
          <h1>Loading ...</h1>
        )
      ) : (
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
      )}
    </div>
  );
}

export default Sidebar;
