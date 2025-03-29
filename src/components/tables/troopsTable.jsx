// import React, { useState } from "react";

// import { Table, Select, Avatar } from "flowbite-react";
import { Table, Avatar } from "flowbite-react";


const TroopsTable = ({users}) => {
    // const [expandedRows, setExpandedRows] = useState([])

    // const toggleRow = (id) => {
    //     setExpandedRows(prev => ({
    //         ...prev,
    //         [id]: !prev[id]
    //     }));
    // }

    return (
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Expand</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                    <div className="flex gap-2">
                        <Avatar alt="User settings" img="" rounded />
                        <div>
                            <div>John Doe</div>
                            <div>email@gmail.com</div>
                        </div>
                    </div>
                </Table.Cell>
                <Table.Cell>(111) 123-1234</Table.Cell>
                <Table.Cell>Troop Leader</Table.Cell>
                <Table.Cell>Date Here</Table.Cell>
                <Table.Cell>Action Icons</Table.Cell>
                <Table.Cell>
                    {/* <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                    </a> */}
                </Table.Cell>
            </Table.Row>
            {/* {orders.map((order) => (
                <React.Fragment key={order.id}>
                    <Table.Row>
                        <Table.Cell>#123456</Table.Cell>
                        <Table.Cell>{order.girlName}</Table.Cell>
                        <Table.Cell>$16.00</Table.Cell>
                        <Table.Cell>3/23/2025</Table.Cell>
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
            ))} */}
        </Table.Body>
        </Table>
    )
  }

export default TroopsTable;