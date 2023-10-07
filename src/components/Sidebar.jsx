import React, { useEffect, useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import Activity from "./sidebarElements/Activity";
import { useSelectedDroneContext } from "../hooks/useSelectedDroneContext";
import axios from "../config/axios";
import drone from "../assets/drones/Drone-Model-1.svg";
import { IoMdArrowRoundBack } from "react-icons/io";
import dronePng from "../assets/drones/drone.png";
import Alerts from "./sidebarElements/Alerts";
import {
  TbCircuitVoltmeter,
  TbWorldLatitude,
  TbWorldLongitude,
} from "react-icons/tb";
import { useModalsContext } from "../hooks/useModalsContext";
import StreamModal from "./StreamModal";
import { FiTarget } from "react-icons/fi";
import { TbDrone } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { RiGpsFill } from "react-icons/ri";
import { LiaSatelliteSolid } from "react-icons/lia";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("Activity");
  const [selectedData, setSelectedData] = useState(null);
  const { selectedDrone, updateSelectedDrone } = useSelectedDroneContext();
  const [selectedInfo, setSelectedInfo] = useState("battery");
  const { openModal } = useModalsContext();
  const options = [
    {
      name: "Activity",
      component: <Activity />,
    },
    {
      name: "Alerts",
      component: <Alerts />,
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
                <h1 className="text-2xl font-semibold text-center py-2">
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
                      <div className="flex items-center gap-1">
                        <TbCircuitVoltmeter className="w-8 h-8" />
                        <h1 className="font-bold">
                          Battery Voltage:{" "}
                          {Math.round(selectedData.battery.voltage_level)}V
                        </h1>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#B9B9B9] opacity-50"></div>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-[90%] mt-6 flex flex-col gap-2 items-center">
                        <div className="relative w-56 h-28 bg-black rounded-lg overflow-hidden">
                          <div className="absolute flex items-center justify-center gap-1 top-2 right-3">
                            <div className="w-2 h-2 bg-[#DC2626] rounded-full" />
                            <p className="font-bold text-white text-xs">Live</p>
                          </div>
                          <img
                            src={dronePng}
                            alt="drone"
                            className="opacity-50"
                          />
                        </div>
                      </div>
                      <button
                        className="bg-[#DC2626] text-white font-semibold py-2 px-6 rounded-lg"
                        onClick={() =>
                          openModal(StreamModal, {
                            streamURL: selectedData.rtc,
                          })
                        }
                      >
                        Live Stream
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center gap-2">
                    <img src={drone} alt="drone" className="w-28 h-28" />
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="bg-[#0073E6] rounded-full w-6 h-6 flex items-center justify-center">
                            <FiTarget className="text-white" />
                          </div>
                          <span className="font-bold text-[#0073E6]">
                            Armed:
                          </span>
                          <span
                            className={`font-bold ${
                              selectedData.status.armed
                                ? "text-[#047857]"
                                : "text-[#DC2626]"
                            }`}
                          >
                            {selectedData.status.armed ? "Yes" : "No"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="bg-[#0073E6] rounded-full w-6 h-6 flex items-center justify-center">
                            <TbDrone className="text-white" />
                          </div>
                          <span className="font-bold text-[#0073E6]">
                            State:
                          </span>
                          <span
                            className={`font-bold ${
                              selectedData.status.in_air
                                ? "text-[#047857]"
                                : "text-[#DC2626]"
                            }`}
                          >
                            {selectedData.status.in_air
                              ? "Traveling"
                              : "Parked"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="bg-[#0073E6] rounded-full w-6 h-6 flex items-center justify-center">
                            <MdOutlineHealthAndSafety className="text-white" />
                          </div>
                          <span className="font-bold text-[#0073E6]">
                            Health:
                          </span>
                          <span
                            className={`font-bold ${
                              selectedData.status.state >= 2
                                ? "text-[#047857]"
                                : "text-[#DC2626]"
                            }`}
                          >
                            {selectedData.status.state >= 3
                              ? "Excellent"
                              : selectedData.status.state >= 2
                              ? "Good"
                              : selectedData.status.state >= 1
                              ? "Fair"
                              : "Poor"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="bg-[#0073E6] rounded-full w-6 h-6 flex items-center justify-center">
                            <RiGpsFill className="text-white" />
                          </div>
                          <span className="font-bold text-[#0073E6]">
                            Gps Fixation:
                          </span>
                          <span className="text-black font-bold">
                            {selectedData.gps.fx}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="bg-[#0073E6] rounded-full w-6 h-6 flex items-center justify-center">
                            <LiaSatelliteSolid className="text-white" />
                          </div>
                          <span className="font-bold text-[#0073E6]">
                            Satellite Number:
                          </span>
                          <span className="text-black font-bold">
                            {selectedData.gps.satellites_number}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
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
