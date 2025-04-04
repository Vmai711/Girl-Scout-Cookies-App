import React, { useState } from "react";

import { Table, Select } from "flowbite-react";
import { AngleDown } from "flowbite-react-icons/outline";
import { AngleUp } from "flowbite-react-icons/outline";

const OrderManagementTable = ({orders}) => {
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
          <Table.HeadCell>Order ID</Table.HeadCell>
          <Table.HeadCell>Customer</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Expand</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
            {orders.map((order) => (
                <React.Fragment key={order.id}>
                    <Table.Row>
                        <Table.Cell>#123456</Table.Cell>
                        <Table.Cell>{order.girlName}</Table.Cell>
                        <Table.Cell>$16.00</Table.Cell>
                        <Table.Cell>{order.timestamp ? new Date(order.timestamp.toDate()).toLocaleDateString() : "N/A"}</Table.Cell>
                        <Table.Cell>
                            <Select id="Status" required>
                                <option value="cancelled">Cancelled</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                            </Select>
                        </Table.Cell>
                        <Table.Cell>
                            <button onClick={() => toggleRow(order.id)}>
                                {expandedRows[order.id] ? <div><AngleUp/></div> : <div><AngleDown/></div>}
                            </button>
                        </Table.Cell>
                    </Table.Row>
                    {expandedRows[order.id] && (
                        <Table.Row>
                            <Table.Cell colSpan={6}>
                            <div key={order.id} className="p-4 border rounded shadow-sm bg-gray-50">
                                <p><strong>Girl's Name:</strong> {order.girlName}</p>
                                <p><strong>Parent's Name:</strong> {order.parentName}</p>
                                
                                {/* Displaying multiple cookies */}
                                <p><strong>Cookies:</strong></p>
                                <ul className="list-disc pl-6">
                                {order.cookieSelections?.map((cookieSelection, index) => (
                                    <li key={index}>
                                    {cookieSelection.cookie} ({cookieSelection.numCookies})
                                    </li>
                                ))}
                                </ul>
                                
                                <p><strong>Pickup Location:</strong> {order.pickupLocation}</p>
                                <p><strong>Contact Method:</strong> {order.contactMethod}</p>
                                <p><strong>Timestamp:</strong> {order.timestamp ? new Date(order.timestamp.toDate()).toLocaleString() : "N/A"}</p>
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

export default OrderManagementTable;