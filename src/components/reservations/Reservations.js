import ReservationCard from "./ReservationCard";
import "./Reservations.css";
import { useState, Fragment } from "react";

const Reservations = (props) => {
  //   const [reservations, setReservations] = useState([
  //     {
  //       id: 101,
  //       name: "John Doe",
  //       date: "2022-01-01",
  //       time: "18:00",
  //       diners: 2,
  //       occasion: "Birthday",
  //       table: { id: 1, name: "Main 1", reserved: true },
  //       specialRequests: "No Special Requests",
  //     },
  //     {
  //       id: 102,
  //       name: "Jane Doe",
  //       date: "2022-01-02",
  //       time: "19:00",
  //       diners: 4,
  //       occasion: "Anniversary",
  //       table: { id: 2, name: "Main 2", reserved: false },
  //       specialRequests: "No Special Requests",
  //     },
  //     {
  //       id: 103,
  //       name: "John Smith",
  //       date: "2022-01-03",
  //       time: "20:00",
  //       diners: 6,
  //       occasion: "Graduation",
  //       table: { id: 3, name: "Main 3", reserved: true },
  //       specialRequests: "No Special Requests",
  //     },
  //   ]);
  const reservations = props.reservations;
  const setReservations = props.setReservations;
  const handleEdit = props.handleEdit;
  // useEffect(() => {
  //     // Fetch all reservations
  //     fetch('http://localhost:3001/reservations')
  //     .then(response => response.json())
  //     .then(data => setReservations(data));
  // }, []);

  return (
    <>
      <h1 id="reservation-header">Reservations</h1>
      <section className="reservations">
        {reservations.map((reservation) => (
          <Fragment key={reservation.id}>
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              reservations={reservations}
              setReservations={setReservations}
              handleEdit={handleEdit}
            />
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default Reservations;
