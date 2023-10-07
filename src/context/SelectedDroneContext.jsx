import { createContext, useState } from 'react';

export const SelectedDroneContext = createContext();

import PropTypes from 'prop-types';

export const SelectedDroneProvider = ({ children }) => {
	const [selectedDrone, setSelectedDrone] = useState(null);

	const updateSelectedDrone = (selectedDrone) => {
		setSelectedDrone(selectedDrone);
	};

	return (
		<SelectedDroneContext.Provider
			value={{ selectedDrone, updateSelectedDrone }}
		>
			{children}
		</SelectedDroneContext.Provider>
	);
};

SelectedDroneProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
