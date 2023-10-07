import React, { useEffect } from "react";
import { useState } from "react";
import { GiDeliveryDrone } from "react-icons/gi";
import pusher from "../../config/pusher";
import moment from "moment/moment";
import axios from "../../config/axios";
import drone from "../../assets/drones/Drone-Model-1.svg";

function Activity() {
  const [selectedDroneUav, setSelectedDroneUav] = useState(null);
  const [activityData, setActivityData] = useState([]);

  const updateActivityData = (uav, data) => {
    setActivityData((prevActivityData) => {
      const activityIndex = prevActivityData.findIndex(
        (activity) => activity.uav === uav
      );
      if (activityIndex !== -1) {
        const newActivityData = [...prevActivityData];
        const oldActivity = prevActivityData[activityIndex].activity;
        newActivityData[activityIndex].activity = data["status"]["in_air"]
          ? "Traveling"
          : "Parked";
        newActivityData[activityIndex].timeStamp =
          oldActivity != newActivityData[activityIndex].activity
            ? Date.now()
            : prevActivityData[activityIndex].timeStamp;
        newActivityData[activityIndex].time =
          moment
            .duration(Date.now() - newActivityData[activityIndex].timeStamp)
            .humanize() + " ago";
        newActivityData[activityIndex].color = data["status"]["in_air"]
          ? "#059669"
          : "#EF4444";
        return [...newActivityData];
      } else {
        return [
          ...prevActivityData,
          {
            uav: uav,
            drone: uav,
            activity: data["in_air"] ? "Traveling" : "Parked",
            timeStamp: Date.now(),
            time: "Just now",
            color: data["in_air"] ? "#059669" : "#EF4444",
          },
        ];
      }
    });
  };

  useEffect(() => {
    axios.get("/api/uavs").then((res) => {
      const uavs = res.data.map((uavJSON) => uavJSON["name"]);
      uavs.forEach((uav) => {
        const channel = pusher.subscribe(uav);
        channel.bind("data_updated", (data) => updateActivityData(uav, data));
      });
    });
  }, []);

  return (
    <ul>
      {activityData.map((activity) => (
        <li
          key={activity.uav}
          onClick={() => {
            setSelectedDroneUav(activity.uav);
          }}
          className={`py-2 px-4 rounded-lg cursor-pointer ${
            activity.uav === selectedDroneUav ? "bg-[#ccd3c5]" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <img src={drone} alt="drone" className="w-20 h-20" />
            <div className="flex flex-col w-full">
              <span className="text-lg font-bold">
                {activity.drone.toUpperCase()}
              </span>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span
                    style={{ color: activity.color }}
                    className="text-xs font-bold"
                  >
                    {activity.activity}
                  </span>
                </div>
                <span className="text-[10px] text-[#B9B9B9]">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Activity;
