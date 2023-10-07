import Sidebar from "../components/Sidebar";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DronesMarkers from "../components/DronesMarkers";

const LiveMap = () => {
    const UpdateMap = () => {
        const map = useMap();

        useMapEvents({
            click: (event) => console.log(event.latlng),
        });

        return null;
    };

    return (
        <div className="flex w-full h-full">
            <Sidebar />
            <MapContainer className="w-full h-full isolate" center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UpdateMap />
                <DronesMarkers />
            </MapContainer>
        </div>
    );
};

export default LiveMap;
