import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LiveMap from './pages/LiveMap';
import { SelectedDroneProvider } from './context/SelectedDroneContext';
import { useModalsContext } from './hooks/useModalsContext';

const App = () => {
	const { CurrentModal, closeModal } = useModalsContext();

	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default App;

function Manage() {
	return <h1>Manage</h1>;
}

function Settings() {
	return <h1>Settings</h1>;
}
