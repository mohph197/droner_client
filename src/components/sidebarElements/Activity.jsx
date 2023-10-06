import React, { useEffect } from 'react';
import { useState } from 'react';
import { GiDeliveryDrone } from 'react-icons/gi';
import pusher from '../../config/pusher';
import moment from 'moment/moment';
import axios from '../../config/axios';

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
				newActivityData[activityIndex].activity = data['status']['in_air']
					? 'Traveling'
					: 'Parked';
				newActivityData[activityIndex].timeStamp =
					oldActivity != newActivityData[activityIndex].activity
						? Date.now()
						: prevActivityData[activityIndex].timeStamp;
				newActivityData[activityIndex].time =
					moment
						.duration(Date.now() - newActivityData[activityIndex].timeStamp)
						.humanize() + ' ago';
				newActivityData[activityIndex].color = data['status']['in_air']
					? '#059669'
					: '#EF4444';
				return [...newActivityData];
			} else {
				return [
					...prevActivityData,
					{
						uav: uav,
						drone: uav,
						activity: data['in_air'] ? 'Traveling' : 'Parked',
						timeStamp: Date.now(),
						time: 'Just now',
						color: data['in_air'] ? '#059669' : '#EF4444',
					},
				];
			}
		});
	};

	useEffect(() => {
		axios.get('/api/uavs').then((res) => {
			const uavs = res.data.map((uavJSON) => uavJSON['name']);
			uavs.forEach((uav) => {
				const channel = pusher.subscribe(uav);
				channel.bind('data_updated', (data) => updateActivityData(uav, data));
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
					className={`flex justify-between items-center py-2 px-4 rounded-lg cursor-pointer ${
						activity.uav === selectedDroneUav ? 'bg-[#ccd3c5]' : ''
					}`}
				>
					<div className='flex items-center gap-2'>
						<GiDeliveryDrone className='w-8 h-8' />
						<div className='flex flex-col'>
							<span
								style={{ color: activity.color }}
								className='text-lg font-bold'
							>
								{activity.activity}
							</span>
							<span className='text-xs font-bold'>{activity.drone}</span>
						</div>
					</div>
					<span className='text-xs'>{activity.time}</span>
				</li>
			))}
		</ul>
	);
}

export default Activity;
