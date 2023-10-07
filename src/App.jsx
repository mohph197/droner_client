import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LiveMap from './pages/LiveMap';
import { SelectedDroneProvider } from './context/SelectedDroneContext';

const App = () => {
	return (
		<BrowserRouter>
			<div className='flex flex-col w-screen h-screen overflow-hidden'>
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
