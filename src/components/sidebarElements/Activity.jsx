import React, { useEffect } from 'react';
import { useState } from 'react';
import pusher from '../../config/pusher';
import moment from 'moment/moment';
import axios from '../../config/axios';
import drone from '../../assets/drones/Drone-Model-1.svg';
import { useSelectedDroneContext } from '../../hooks/useSelectedDroneContext';
import { useStatusDataContext } from '../../hooks/useStatusDataContext';

function Activity() {
	const [selectedDroneUav, setSelectedDroneUav] = useState(null);
	const [activityData, setActivityData] = useState([]);
	const { updateSelectedDrone } = useSelectedDroneContext();
	const { data } = useStatusDataContext();

	useEffect(() => {
		setActivityData((prevActivityData) => {
			return data.map((uavData) => {
				const oldData = prevActivityData.find(
					(activityData) => activityData.uav === uavData.uav
				);
				const newActivity = uavData.data['status']['in_air']
					? 'Traveling'
					: 'Parked';
				const newTimeStamp =
					oldData && oldData.activity == newActivity
						? oldData.timeStamp
						: Date.now();
				const newTime =
					oldData && oldData.activity == newActivity
						? moment.duration(Date.now() - newTimeStamp).humanize() + ' ago'
						: 'Just now';
				return {
					uav: uavData.uav,
					drone: uavData.uav,
					activity: newActivity,
					timeStamp: newTimeStamp,
					time: newTime,
					color: uavData.data['status']['in_air'] ? '#059669' : '#EF4444',
				};
			});
		});
	}, [data]);

	return (
		<ul>
			{activityData.map((activity) => (
				<>
					<li
						key={activity.uav}
						onClick={() => {
							setSelectedDroneUav(activity.uav);
							updateSelectedDrone(activity.uav);
						}}
						className={`py-2 px-4 rounded-lg cursor-pointer hover:bg-[#ccd3c5] transition duration-200 ease-in-out ${
							activity.uav === selectedDroneUav ? 'bg-[#ccd3c5]' : ''
						}`}
					>
						<div className='flex items-center gap-2'>
							<img src={drone} alt='drone' className='w-20 h-20' />
							<div className='flex flex-col w-full'>
								<span className='text-lg font-bold'>
									{activity.drone.toUpperCase()}
								</span>
								<div className='flex justify-between items-center'>
									<div className='flex items-center'>
										<div
											className='w-2 h-2 rounded-full'
											style={{ backgroundColor: activity.color }}
										/>
										<span
											style={{ color: activity.color }}
											className='text-xs font-bold'
										>
											{activity.activity}
										</span>
									</div>
									<span className='font-bold text-[10px] text-[rgb(117,116,116)]'>
										{activity.time}
									</span>
								</div>
							</div>
						</div>
					</li>
					<div className='w-full h-[1px] bg-[#B9B9B9] opacity-50'></div>
				</>
			))}
		</ul>
	);
}

export default Activity;
