import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StatusDataContext = createContext({
	data: [],
	updateData: (uav, data) => {},
});

export const StatusDataProvider = ({ children }) => {
	const [data, setData] = useState([]);

	const updateData = (uav, newData) => {
		setData((prevData) => {
			const dataIndex = prevData.findIndex((prev) => prev.uav === uav);
			if (dataIndex !== -1) {
				const newTimeStamp =
					prevData[dataIndex].data['status']['in_air'] ==
					newData['status']['in_air']
						? prevData[dataIndex].timeStamp
						: Date.now();
				const newContextData = [...prevData];
				newContextData[dataIndex].data = newData;
				newContextData[dataIndex].timeStamp = newTimeStamp;
				return [...newContextData];
			} else {
				return [
					...prevData,
					{
						uav: uav,
						data: newData,
						timeStamp: Date.now(),
					},
				];
			}
		});
	};

	return (
		<StatusDataContext.Provider value={{ data, updateData }}>
			{children}
		</StatusDataContext.Provider>
	);
};

StatusDataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
