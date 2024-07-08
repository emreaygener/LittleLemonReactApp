import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import BookingPage from "./bookingPage/BookingPage";

export default function Main() {
  return (
    <main id="Main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </main>
  );
}
