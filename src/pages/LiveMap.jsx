import Sidebar from '../components/Sidebar';
import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DronesMarkers from '../components/DronesMarkers';
import axios from '../config/axios';
import { useStatusDataContext } from '../hooks/useStatusDataContext';
import pusher from '../config/pusher';
import { useEffect } from 'react';

const LiveMap = () => {
	const { updateData } = useStatusDataContext();

	const UpdateMap = () => {
		const map = useMap();

		useMapEvents({
			click: (event) => console.log(event.latlng),
		});

		return null;
	};

	useEffect(() => {
		axios.get('/api/uavs').then((res) => {
			const uavs = res.data.map((uavJSON) => uavJSON['name']);
			uavs.forEach((uav) => {
				const channel = pusher.subscribe(uav);
				channel.bind('data_updated', (data) => updateData(uav, data));
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

	return (
		<div className='flex w-full h-full'>
			<Sidebar />
			<MapContainer
				className='w-full h-full isolate'
				center={[30.194032754001675, 1.954430031865089]}
				zoom={5}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<UpdateMap />
				<DronesMarkers />
			</MapContainer>
		</div>
	);
};

export default LiveMap;
