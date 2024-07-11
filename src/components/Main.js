import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import BookingPage from "./bookingPage/BookingPage";
import { useReducer } from "react";

// Step 1: Update function
export const updateTimes = (state, action) => {
  // For now, return the same times regardless of the action
  // Later, you can add logic to filter times based on the action.date
  return state;
};

export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
};

export default function Main() {
  const initialTimes = initializeTimes();
  const [availableTimes, dispatch] = useReducer(updateTimes, initialTimes);

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
            />
          }
        />
      </Routes>
    </main>
  );
}
