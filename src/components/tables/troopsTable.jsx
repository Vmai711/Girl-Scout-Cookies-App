import React from "react";
import { Table, Avatar } from "flowbite-react";
import { HiPencil } from "react-icons/hi";

const TroopsTable = ({ users }) => {
  const formatPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) return "Invalid";
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

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
        {users.map((user) => (
          <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <div className="flex gap-2">
                <Avatar alt="User Avatar" img="" rounded />
                <div>
                  <div>{user.name || "N/A"}</div>
                  <div>{user.email || "N/A"}</div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>{formatPhoneNumber(user.phone)}</Table.Cell>
            <Table.Cell>{user.currentRole || "N/A"}</Table.Cell>
            <Table.Cell>
              {user.createdAt?.toDate
                ? new Date(user.createdAt.toDate()).toLocaleDateString()
                : "N/A"}
            </Table.Cell>
            <Table.Cell>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => console.log("Edit user:", user.id)}
              >
                <HiPencil size={18} />
              </button>
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TroopsTable;
