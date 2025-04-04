import React, { useEffect, useState } from "react";
import { fetchReservations } from "../../firebase/firestore";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import ReservationTable from "../tables/reservation_table";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch reservations from Firestore
  useEffect(() => {
    const getReservations = async () => {
      try {
        const reservationList = await fetchReservations();
        setReservations(reservationList);
        setFilteredReservations(reservationList);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    getReservations();
  }, []);

  // Automatically filter orders when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      const filtered = reservations.filter(reservation => {
        if (reservation.timestamp) {
          const reservationDate = new Date(reservation.timestamp.toDate());
          return reservationDate >= start && reservationDate <= end;
        }
        return false;
      });

      setFilteredReservations(filtered);
    } else {
      setFilteredReservations(reservations);
    }
  }, [startDate, endDate, reservations]);

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Rservations"}/>
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Reservations</h1>
            <div className="flex justify-center gap-4 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
            </div>

            {filteredReservations.length === 0 ? (
              <p className="text-center">No reservations found in the selected range.</p>
            ) : (
              <ReservationTable reservations={filteredReservations}/>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservations;
