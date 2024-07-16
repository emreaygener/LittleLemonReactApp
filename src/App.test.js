import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import BookingForm from "./components/bookingPage/BookingForm";
import {
  updateTimes,
  initializeTimes,
  getReservationsFromLocalStorage,
  saveReservationsToLocalStorage,
} from "./components/Main";
import userEvent from "@testing-library/user-event";
import * as api from "./Api";
import { MemoryRouter } from "react-router-dom";

jest.mock("./Api", () => ({
  fetchAPI: jest.fn(),
}));

describe("BookingForm", () => {
  test("Renders the BookingForm heading", () => {
    render(
      <MemoryRouter>
        <BookingForm availableTimes={[]} updateTimes={() => {}} />
      </MemoryRouter>
    );
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
  });

  test("User can progress to the next step", () => {
    render(
      <MemoryRouter>
        <BookingForm availableTimes={[]} updateTimes={() => {}} />
      </MemoryRouter>
    );
    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test("User can submit the form when form is filled as intended", async () => {
    const mockSubmit = jest.fn();

    render(
      <MemoryRouter>
        <BookingForm
          availableTimes={["17:00", "18:00", "19:00"]}
          updateTimes={() => {}}
        />
      </MemoryRouter>
    );

    await userEvent.type(
      screen.getByLabelText("Reservation date:"),
      "2025-04-01"
    );

    const tableToSelect = screen.getByText("Porch 1");
    await userEvent.click(tableToSelect);

    userEvent.selectOptions(screen.getByLabelText("Reservation time:"), [
      "18:00",
    ]);

    await userEvent.type(screen.getByLabelText("Number of diners:"), "4");
    await userEvent.type(
      screen.getByLabelText("Special requests:"),
      "Window seat, please."
    );

    const form = screen.getByRole("form");
    form.onsubmit = mockSubmit;

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
  });
});

describe("initializeTimes function", () => {
  test("returns the correct array of times", () => {
    const mockResult = ["17:00", "18:00", "19:00"];
    api.fetchAPI.mockReturnValue(mockResult);

    const initialTimes = initializeTimes();
    expect(initialTimes).toEqual(mockResult);
  });
});

describe("updateTimes function", () => {
  test("updates state correctly when action type is 'update'", () => {
    const mockState = ["17:00", "18:00"];
    const mockAction = { type: "update", date: new Date("2023-04-01") };
    const mockResult = ["17:00", "17:30", "18:00", "18:30"];
    api.fetchAPI.mockReturnValue(mockResult);

    const updatedState = updateTimes(mockState, mockAction);
    expect(updatedState).toEqual(mockResult);
  });

  test("returns the same state when action type is not 'update'", () => {
    const mockState = ["17:00", "18:00"];
    const mockAction = { type: "not_update", date: new Date("2023-04-01") };

    const updatedState = updateTimes(mockState, mockAction);
    expect(updatedState).toBe(mockState);
  });
});

describe("Local Storage Reservations", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getReservationsFromLocalStorage retrieves reservations correctly when they exist", () => {
    const reservations = [
      { id: 1, name: "Alice", date: "2023-04-01", time: "18:00" },
      { id: 2, name: "Bob", date: "2023-04-02", time: "19:00" },
    ];

    localStorage.setItem("reservations", JSON.stringify(reservations));

    const retrievedReservations = getReservationsFromLocalStorage();
    expect(retrievedReservations).toEqual(reservations);
  });

  test("getReservationsFromLocalStorage returns default reservations when none exist", () => {
    const defaultReservations = [
      {
        id: 101,
        name: "John Doe",
        date: "2022-01-01",
        time: "18:00",
        diners: 2,
        occasion: "Birthday",
        table: { id: 1, name: "Main 1", reserved: true },
        email: "john@doe.com",
        phone: "04876548732",
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
        email: "jane@doe.com",
        phone: "04876548778",
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
        email: "john@smith.com",
        phone: "04876548732",
        specialRequests: "No Special Requests",
      },
    ];

    const retrievedReservations = getReservationsFromLocalStorage();
    expect(retrievedReservations).toEqual(defaultReservations);
  });

  test("saveReservationsToLocalStorage saves reservations correctly", () => {
    const reservations = [
      { id: 1, name: "Alice", date: "2023-04-01", time: "18:00" },
    ];

    saveReservationsToLocalStorage(reservations);

    const retrievedReservations = JSON.parse(
      localStorage.getItem("reservations")
    );
    expect(retrievedReservations).toEqual(reservations);
  });
});
