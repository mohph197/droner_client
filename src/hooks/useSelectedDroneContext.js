import { useContext } from 'react';
import { SelectedDroneContext } from '../context/SelectedDroneContext';

export const useSelectedDroneContext = () => {
	if (SelectedDroneContext) {
		return useContext(SelectedDroneContext);
	} else {
		throw new Error('SelectedDroneContext is required');
	}
};
