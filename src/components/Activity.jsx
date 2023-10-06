import React from "react";
import { useState } from "react";

function Activity() {
  const activityData = [
    {
      uav: "UAV 1",
      drone: "Drone h15",
      activity: "Traveling",
      time: "3min ago",
      color: "#059669",
    },
    {
      uav: "UAV 2",
      drone: "Drone C45",
      activity: "Parked",
      time: "5min ago",
      color: "#94A3B8",
    },
    {
      uav: "UAV 3",
      drone: "Drone T7",
      activity: "Traveling",
      time: "10min ago",
      color: "#EF4444",
    },
    {
      uav: "UAV 4",
      drone: "Drone T7",
      activity: "Traveling",
      time: "10min ago",
      color: "#FFC107",
    },
  ];
  const [selectedDroneUav, setSelectedDroneUav] = useState(null);
  return (
    <ul>
      {activityData.map((activity) => (
        <li
          key={activity.uav}
          onClick={() => {
            setSelectedDroneUav(activity.uav);
          }}
          className={`flex justify-between items-center py-2 px-4 rounded-lg cursor-pointer ${
            activity.uav === selectedDroneUav ? "bg-[#ccd3c5]" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full border border-black"
              style={{ backgroundColor: activity.color }}
            ></div>
            <div className="flex flex-col">
              <span
                style={{ color: activity.color }}
                className="text-lg font-bold"
              >
                {activity.activity}
              </span>
              <span className="text-xs font-bold">{activity.drone}</span>
            </div>
          </div>
          <span className="text-xs">{activity.time}</span>
        </li>
      ))}
    </ul>
  );
}

export default Activity;
