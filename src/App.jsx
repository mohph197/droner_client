import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LiveMap from './pages/LiveMap';
import { Manage } from './pages/Manage';

import Header from './components/Header';
import { useModalsContext } from './hooks/useModalsContext';
import { SelectedDroneProvider } from './context/SelectedDroneContext';
import { ChakraProvider } from '@chakra-ui/react';
import { StatusDataProvider } from './context/StatusDataContext';

const App = () => {
	const { CurrentModal, closeModal } = useModalsContext();

	return (
		<BrowserRouter>
			<ChakraProvider>
				<StatusDataProvider>
					<div className='flex flex-col w-screen h-screen overflow-hidden isolate'>
						<Header />
						<div className='flex-1'>
							<Routes>
								<Route
									path='/'
									element={
										<SelectedDroneProvider>
											<LiveMap />
										</SelectedDroneProvider>
									}
								/>
								<Route path='/manage' element={<Manage />} />
								<Route path='/settings' element={<Settings />} />
							</Routes>
						</div>
						{CurrentModal && (
							<div className='fixed inset-0 z-50 flex items-center justify-center isolate'>
								<div
									className='absolute inset-0 bg-black bg-opacity-40 backdrop-blur -z-10 hover:cursor-pointer'
									onClick={closeModal}
								></div>
								<CurrentModal.Modal {...CurrentModal.args} />
							</div>
						)}
					</div>
				</StatusDataProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;

function Settings() {
	return <h1>Settings</h1>;
}
