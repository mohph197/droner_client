import { StatusDataContext } from '../context/StatusDataContext';
import { useContext } from 'react';

export const useStatusDataContext = () => {
	if (StatusDataContext) {
		return useContext(StatusDataContext);
	} else {
		throw new Error(
			'useStatusDataContext must be used within a StatusDataProvider'
		);
	}
};
