import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ModalsProvider } from './context/ModalsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ModalsProvider>
		<App />
	</ModalsProvider>
);
