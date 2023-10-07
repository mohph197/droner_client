import { FunctionComponent, ReactNode, createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalsContext = createContext({
	CurrentModal: <></>,
	openModal: (Modal, args) => {},
	closeModal: () => {},
});

export const ModalsProvider = ({ children }) => {
	const [CurrentModal, setCurrentModal] = useState();

	const openModal = (Modal, args) => {
		console.log(`Opening modal:`);
		console.log(Modal);
		console.log(args);
		setCurrentModal({
			Modal: Modal,
			args: args,
		});
	};

	const closeModal = () => {
		setCurrentModal(null);
	};

	return (
		<ModalsContext.Provider value={{ CurrentModal, openModal, closeModal }}>
			{children}
		</ModalsContext.Provider>
	);
};

ModalsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
