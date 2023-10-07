import { useMap, Marker, Tooltip } from 'react-leaflet';
import { useSelectedDroneContext } from '../hooks/useSelectedDroneContext';
import Leaflet from 'leaflet';
import axios from '../config/axios';
import pusher from '../config/pusher';
import { useEffect, useState } from 'react';
import { useStatusDataContext } from '../hooks/useStatusDataContext';
import droneIcon from '../../assets/images/drone.png';

const DronesMarkers = () => {
	const map = useMap();
	const { updateSelectedDrone, selectedDrone } = useSelectedDroneContext();
	const { data } = useStatusDataContext();
	const [dronePoses, setDronePoses] = useState([]);

	useEffect(() => {
		setDronePoses(
			data.map((uavData) => {
				return {
					name: uavData.uav,
					latitude: uavData.data.gps.lat,
					longitude: uavData.data.gps.lon,
				};
			})
		);
	}, [data]);

	return (
		<>
			{dronePoses.map((dronePose, i) => {
				if (dronePose.name === selectedDrone) {
					map.setView(
						[dronePose.latitude, dronePose.longitude],
						Math.max(10, map.getZoom())
					);
				}
				return (
					<Marker
						key={i}
						position={[dronePose.latitude, dronePose.longitude]}
						alt={dronePose.name}
						icon={Leaflet.icon({
							iconUrl: droneIcon,
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
						<Tooltip direction='top' offset={[10, 10]}>
							{dronePose.name.toUpperCase()}
						</Tooltip>
					</Marker>
				);
			})}
		</>
	);
};

export default DronesMarkers;
