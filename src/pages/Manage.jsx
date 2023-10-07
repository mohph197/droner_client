import {
    Badge,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import dron from "../../assets/images/drone.png";

import axios from "../config/axios";

import React, { useEffect, useState } from "react";
import moment from "moment";

const Manage = () => {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        axios.get("/api/uavs/missions").then(({ data }) => {
            setMissions(data);
        });
    }, []);

    return (
        <div className="flex justify-center">
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Dron name</Th>
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
                                <Td>
                                    {moment(mission.starting_date).format("DD/MM/YYYY HH:MM:SS")}
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
    );
};

export { Manage };
