import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import BookingForm from "./components/bookingPage/BookingForm";
import { updateTimes, initializeTimes } from "./components/Main";
import userEvent from "@testing-library/user-event";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("BookingForm", () => {
  test("Renders the BookingForm heading", () => {
    render(<BookingForm availableTimes={[]} updateTimes={() => {}} />);
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
  });

  test("User can progress to the next step", () => {
    render(<BookingForm availableTimes={[]} updateTimes={() => {}} />);
    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test("User can submit the form when filled as intended", async () => {
    const mockSubmit = jest.fn();

    render(
      <BookingForm
        availableTimes={["17:00", "18:00", "19:00"]}
        updateTimes={() => {}}
      />
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
    const expectedTimes = [
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    const times = initializeTimes();
    expect(times).toEqual(expectedTimes);
  });
});

describe("updateTimes function", () => {
  test("returns the same state when called", () => {
    const state = ["17:00", "18:00"];
    const action = { type: "update", date: "2023-04-01" };
    const updatedState = updateTimes(state, action);
    expect(updatedState).toBe(state);
  });
});
