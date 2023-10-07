import { useMap, Marker, Tooltip } from "react-leaflet";
import { useSelectedDroneContext } from "../hooks/useSelectedDroneContext";
import Leaflet from "leaflet";
import axios from "../config/axios";
import pusher from "../config/pusher";
import { useEffect, useState } from "react";

const DronesMarkers = () => {
    const map = useMap();
    const { updateSelectedDrone, selectedDrone } = useSelectedDroneContext();

    const [dronePoses, setDronePoses] = useState([]);

    useEffect(() => {
        axios.get("/api/uavs").then((res) => {
            const uavs = res.data.map((uavJSON) => uavJSON["name"]);
            uavs.forEach((uav) => {
                const channel = pusher.subscribe(uav);
                channel.bind("data_updated", (data) => updatePoses(uav, data));
            });
            axios.post("/api/uavs/data_streaming/start", {
                uavs: uavs,
            });
        });

        return () => {
            axios.get("/api/uavs").then((res) => {
                const uavs = res.data.map((uavJSON) => uavJSON["name"]);
                uavs.forEach((uav) => {
                    pusher.unsubscribe(uav);
                });
                axios.post("/api/uavs/data_streaming/stop", {
                    uavs: uavs,
                });
            });
        };
    }, []);

    const updatePoses = (uav, data) => {
        setDronePoses((prevDronePoses) => {
            console.log(prevDronePoses);
            const posIndex = prevDronePoses.findIndex((dronePose) => dronePose.name === uav);
            if (posIndex !== -1) {
                const newPoses = [...prevDronePoses];
                newPoses[posIndex].latitude = data["gps"]["lat"];
                newPoses[posIndex].longitude = data["gps"]["lon"];
                return [...newPoses];
            } else {
                return [
                    ...prevDronePoses,
                    {
                        name: uav,
                        latitude: data["gps"]["lat"],
                        longitude: data["gps"]["lon"],
                    },
                ];
            }
        });
    };

    return (
        <>
            {dronePoses.map((dronePose, i) => {
                if (dronePose.name === selectedDrone) {
                    map.setView([dronePose.latitude, dronePose.longitude], 13);
                }
                return (
                    <Marker
                        key={i}
                        position={[dronePose.latitude, dronePose.longitude]}
                        alt={dronePose.name}
                        icon={Leaflet.icon({
                            iconUrl: "/assets/images/drone.png",
                            iconAnchor: [25, 25],
                            iconSize: [60, 60],
                        })}
                        title={dronePose.name}
                        eventHandlers={{
                            click: () => {
                                updateSelectedDrone(dronePose.name);
                            },
                        }}
                    >
                        <Tooltip direction="top" offset={[10, 10]}>
                            {dronePose.name.toUpperCase()}
                        </Tooltip>
                    </Marker>
                );
            })}
        </>
    );
};

export default DronesMarkers;
