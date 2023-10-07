import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StatusDataContext = createContext({
	data: [],
	updateData: (uav, data) => {},
});

export const StatusDataProvider = ({ children }) => {
	const [data, setData] = useState([]);

	const updateData = (uav, data) => {
		setData((prevData) => {
			const dataIndex = prevData.findIndex((data) => data.uav === uav);
			if (dataIndex !== -1) {
				const newData = [...prevData];
				newData[dataIndex].data = data;
				return [...newData];
			} else {
				return [
					...prevData,
					{
						uav: uav,
						data: data,
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
