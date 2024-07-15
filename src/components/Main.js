import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import BookingPage from "./bookingPage/BookingPage";
import { useReducer, useState } from "react";
import { fetchAPI, submitAPI } from "../Api";
import Reservations from "./reservations/Reservations";

// Step 1: Update function
export const updateTimes = (state, action) => {
  if (action.type === "update") {
    return fetchAPI(action.date);
  }
  return state;
};

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export const submitForm = (form) => {
  return submitAPI(form);
};

export default function Main() {
  const initialTimes = initializeTimes();
  const [availableTimes, dispatch] = useReducer(updateTimes, initialTimes);
  const [reservations, setReservations] = useState([
    {
      id: 101,
      name: "John Doe",
      date: "2022-01-01",
      time: "18:00",
      diners: 2,
      occasion: "Birthday",
      table: { id: 1, name: "Main 1", reserved: true },
      specialRequests: "No Special Requests",
    },
    {
      id: 102,
      name: "Jane Doe",
      date: "2022-01-02",
      time: "19:00",
      diners: 4,
      occasion: "Anniversary",
      table: { id: 2, name: "Main 2", reserved: false },
      specialRequests: "No Special Requests",
    },
    {
      id: 103,
      name: "John Smith",
      date: "2022-01-03",
      time: "20:00",
      diners: 6,
      occasion: "Graduation",
      table: { id: 3, name: "Main 3", reserved: true },
      specialRequests: "No Special Requests",
    },
  ]);

  const navigate = useNavigate();

  const handleEdit = (reservation) => {
    navigate(`/booking/${reservation.id}`, {
      state: { editForm: reservation },
    });
  };

  return (
    <main id="Main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              updateTimes={(selectedDate) =>
                dispatch({ type: "update", date: selectedDate })
              }
              onSubmit={submitForm}
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />
        <Route
          path="/booking/:id"
          element={
            <BookingPage
              availableTimes={availableTimes}
              updateTimes={(selectedDate) =>
                dispatch({ type: "update", date: selectedDate })
              }
              onSubmit={submitForm}
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />
        <Route
          path="/reservations"
          element={
            <Reservations
              handleEdit={handleEdit}
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />
      </Routes>
    </main>
  );
}
