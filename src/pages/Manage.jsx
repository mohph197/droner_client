import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import dron from "../../assets/images/drone.png";
import axios from "../config/axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Manage = () => {
  const [missions, setMissions] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    axios.get("/api/uavs/missions").then(({ data }) => {
      setMissions(data);
    });
  }, []);

  const [formData, setFormData] = useState({
    uav: "",
    name: "",
    desc: "",
    start_date: new Date(),
    start_point: {
      lon: 0,
      lat: 0,
    },
    destination_point: {
      lon: 0,
      lat: 0,
    },
    avg_speed: 0,
    record_video: true,
    should_return: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post("/api/uavs/missions", formData).then(({ data }) => {
      setMissions((prevMissions) => [...prevMissions, data]);
      setDisplayForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Dron name</Th>
                  <Th>Name</Th>
                  <Th>Starting Date</Th>
                  <Th isNumeric>Starting Point</Th>
                  <Th isNumeric>Destination Point</Th>
                  <Th isNumeric>Speed</Th>
                  <Th>State</Th>
                </Tr>
              </Thead>

              <Tbody>
                {missions.map((mission) => (
                  <Tr key={mission.id}>
                    <Td className="flex items-center gap-2">
                      <img src={dron} width={40} />
                      {mission.uav}
                    </Td>
                    <Td>{mission.name}</Td>
                    <Td>
                      {moment(mission.starting_date).format(
                        "DD/MM/YYYY HH:MM:SS"
                      )}
                    </Td>
                    <Td isNumeric>
                      {Math.round(mission.starting_point.lat, 2)},{" "}
                      {Math.round(mission.starting_point.lon, 2)}
                    </Td>
                    <Td isNumeric>
                      {Math.round(mission.destination_point.lat, 2)},{" "}
                      {Math.round(mission.destination_point.lon, 2)}
                    </Td>
                    <Td isNumeric>{mission.avg_speed} km/h</Td>
                    <Td>
                      <Badge>{mission.status.toUpperCase()}</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <button
          onClick={() => setDisplayForm(true)}
          className="flex self-center items-center justify-center gap-2 w-fit px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          <BiAddToQueue className="w-6 h-6 text-white" />
          Add new mission
        </button>
      </div>
      {displayForm ? (
        <div className="fixed top-0 w-screen h-full bg-[#808080]  flex items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="uav"
                className="block text-gray-700 font-semibold"
              >
                UAV:
              </label>
              <input
                type="text"
                id="uav"
                name="uav"
                value={formData.uav}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Mission Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-gray-700 font-semibold"
              >
                Desc:
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    start_date: new Date(e.target.value),
                  });
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="start_point"
                className="block text-gray-700 font-semibold"
              >
                Start Point:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  placeholder="Latitude"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      start_point: {
                        ...formData.start_point,
                        lat: e.target.value,
                      },
                    });
                    console.log(e.target.value);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <input
                  type="number"
                  id="lon"
                  name="lon"
                  placeholder="Longitude"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      start_point: {
                        ...formData.start_point,
                        lon: e.target.value,
                      },
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="destination_point"
                className="block text-gray-700 font-semibold"
              >
                Destination Point:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  placeholder="Latitude"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      destination_point: {
                        ...formData.destination_point,
                        lat: e.target.value,
                      },
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <input
                  type="number"
                  id="lon"
                  name="lon"
                  placeholder="Longitude"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      destination_point: {
                        ...formData.destination_point,
                        lon: e.target.value,
                      },
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="avg_speed"
                className="block text-gray-700 font-semibold"
              >
                Average Speed:
              </label>
              <input
                id="avg_speed"
                type="range"
                min="2"
                max="50"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    avg_speed: e.target.value,
                  })
                }
                step="5"
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="should_return"
                name="should_return"
                checked={formData.should_return}
                onChange={() =>
                  setFormData({
                    ...formData,
                    should_return: !formData.should_return,
                  })
                }
                className="mr-2 focus:ring text-blue-500"
              />
              <span className="text-gray-700">Should Return</span>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="record_video"
                name="record_video"
                checked={formData.record_video}
                onChange={() =>
                  setFormData({
                    ...formData,
                    record_video: !formData.record_video,
                  })
                }
                className="mr-2 focus:ring text-blue-500"
              />
              <span className="text-gray-700">Record Video</span>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={() => setDisplayForm(false)}
                className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 focus:outline-none"
              >
                close
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export { Manage };
