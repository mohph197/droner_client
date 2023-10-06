// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // import Header from "./components/Header";
// // import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <>
//       <Dashboard />
//       {/* <Header />
//       <Sidebar /> */}
//       {/* <MapContainer
//         className="w-60 h-60"
//         center={[51.505, -0.09]}
//         zoom={13}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer> */}
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex w-screen h-screen overflow-hidden">
        <Sidebar />
        <div className="w-[100%]">
          <Header />
          <div className="p-2 h-screen">
            <Routes>
              <Route path="/" element={<LiveMap />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

function LiveMap() {
  return <h1>LiveMap</h1>;
}

function Manage() {
  return <h1>Manage</h1>;
}

function Settings() {
  return <h1>Settings</h1>;
}
