import Sidebar from '../components/Sidebar';
import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import pusher from '../config/pusher';
import { useEffect, useState } from 'react';
import axios from '../config/axios';

const LiveMap = () => {
	const [dronePoses, setDronePoses] = useState([]);

	useEffect(() => {
		axios.get('/api/uavs').then((res) => {
			const uavs = res.data.map((uavJSON) => uavJSON['name']);
			uavs.forEach((uav) => {
				const channel = pusher.subscribe(uav);
				channel.bind('data_updated', (data) => updatePoses(uav, data));
			});
			axios.post('/api/uavs/data_streaming/start', {
				uavs: uavs,
			});
		});

		return () => {
			axios.get('/api/uavs').then((res) => {
				const uavs = res.data.map((uavJSON) => uavJSON['name']);
				uavs.forEach((uav) => {
					pusher.unsubscribe(uav);
				});
				axios.post('/api/uavs/data_streaming/stop', {
					uavs: uavs,
				});
			});
		};
	}, []);

	const updatePoses = (uav, data) => {
		setDronePoses((prevDronePoses) => {
			console.log(prevDronePoses);
			const posIndex = prevDronePoses.findIndex(
				(dronePose) => dronePose.name === uav
			);
			if (posIndex !== -1) {
				const newPoses = [...prevDronePoses];
				newPoses[posIndex].latitude = data['gps']['lat'];
				newPoses[posIndex].longitude = data['gps']['lon'];
				return [...newPoses];
			} else {
				return [
					...prevDronePoses,
					{
						name: uav,
						latitude: data['gps']['lat'],
						longitude: data['gps']['lon'],
					},
				];
			}
		});
	};

	const UpdateMap = () => {
		const map = useMap();

		useMapEvents({
			click: (event) => console.log(event.latlng),
		});

		return null;
	};

	return (
		<div className='flex w-full h-full'>
			<Sidebar />
			<MapContainer
				className='w-full h-full'
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<UpdateMap />
				{dronePoses.map((dronePose, i) => (
					<Marker
						key={i}
						position={[dronePose.latitude, dronePose.longitude]}
						alt={dronePose.name}
						icon={Leaflet.icon({
							iconUrl: '/assets/images/drone.png',
							iconAnchor: [25, 25],
							iconSize: [60, 60],
						})}
					/>
				))}
			</MapContainer>
		</div>
	);
};

export default LiveMap;
