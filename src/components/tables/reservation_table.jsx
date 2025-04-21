import React, { useState } from "react";

import { Table, Select } from "flowbite-react";
import { AngleDown } from "flowbite-react-icons/outline";
import { AngleUp } from "flowbite-react-icons/outline";

const ReservationTable = ({reservations}) => {
    const [expandedRows, setExpandedRows] = useState([])

    const toggleRow = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    return (
      <Table>
        <Table.Head>
          <Table.HeadCell>Reservation ID</Table.HeadCell>
          <Table.HeadCell>Customer</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Expand</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
            {reservations.map((reservation) => (
                <React.Fragment key={reservation.id}>
                    <Table.Row>
                        <Table.Cell>#123456</Table.Cell>
                        <Table.Cell>{reservation.girlName}</Table.Cell>
                        <Table.Cell>{reservation.startingTime}</Table.Cell>
                        <Table.Cell>{reservation.timestamp ? new Date(reservation.timestamp.toDate()).toLocaleDateString() : "N/A"}</Table.Cell>
                        <Table.Cell>
                            <Select id="Status" required>
                                <option value="cancelled">Cancelled</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                            </Select>
                        </Table.Cell>
                        <Table.Cell>
                            <button onClick={() => toggleRow(reservation.id)}>
                                {expandedRows[reservation.id] ? <div><AngleUp/></div> : <div><AngleDown/></div>}
                            </button>
                        </Table.Cell>
                    </Table.Row>
                    {expandedRows[reservation.id] && (
                        <Table.Row>
                            <Table.Cell colSpan={6}>
                            <div key={reservation.id} className="p-4 border rounded shadow-sm bg-gray-50">
                                <p><strong>Girl's Name:</strong> {reservation.girlName}</p>
                                <p><strong>Parent's Name:</strong> {reservation.parentName}</p>
                                <p><strong>Booth Location:</strong> {reservation.boothLocation}</p>
                                <p><strong>Starting Time:</strong> {reservation.startingTime}</p>
                                <p><strong>Timestamp:</strong> {reservation.timestamp ? new Date(reservation.timestamp.toDate()).toLocaleString() : "N/A"}</p>
                            </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </React.Fragment>
            ))}
        </Table.Body>
        </Table>
    )
  }

export default ReservationTable;