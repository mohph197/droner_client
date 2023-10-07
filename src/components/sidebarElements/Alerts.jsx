import React from "react";
import { useState } from "react";
import { MdBatteryAlert } from "react-icons/md";

function Alerts() {
  const alertsData = [
    {
      uav: "UAV 4",
      drone: "UAV4",
      info: "Battery Low",
      time: "5min ago",
      color: "#EF4444",
    },
  ];
  const [selectedDroneUav, setSelectedDroneUav] = useState(null);
  return (
    <ul>
      {alertsData.map((alert) => (
        <li
          key={alert.uav}
          onClick={() => {
            setSelectedDroneUav(alert.uav);
          }}
          className={`flex justify-between items-center py-2 px-4 rounded-lg cursor-pointer ${
            alert.uav === selectedDroneUav ? "bg-[#ccd3c5]" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <MdBatteryAlert className="w-8 h-8" fill={alert.color} />
            <div className="flex flex-col">
              <span
                style={{ color: alert.color }}
                className="text-lg font-bold"
              >
                {alert.info}
              </span>
              <span className="text-xs font-bold">{alert.drone}</span>
            </div>
          </div>
          <span className="text-xs">{alert.time}</span>
        </li>
      ))}
    </ul>
  );
}

export default Alerts;
