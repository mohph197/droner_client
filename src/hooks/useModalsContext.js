import { ModalsContext } from '../context/ModalsContext';
import { useContext } from 'react';

export const useModalsContext = () => {
	if (ModalsContext) {
		return useContext(ModalsContext);
	} else {
		throw new Error('ModalsContext is required');
	}
};
