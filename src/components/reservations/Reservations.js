import ReservationCard from "./ReservationCard";
import "./Reservations.css";
import { Fragment } from "react";

const Reservations = (props) => {
  const reservations = props.reservations;
  const setReservations = props.setReservations;
  const handleEdit = props.handleEdit;

  return (
    <>
      <h1 id="reservation-header">Reservations</h1>
      <section className="reservations">
        {reservations.map((reservation) => (
          <Fragment key={reservation.id}>
            <ReservationCard
              key={reservation.id + 100}
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
