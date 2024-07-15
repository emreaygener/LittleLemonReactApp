import "./BookingForm.css";
import TableSelection from "./TableSelection";
import { useEffect, useState } from "react";
import ConfirmBooking from "./ConfirmBooking";
import { useLocation } from "react-router-dom";

const BookingForm = (props) => {
  const availableTimes = props.availableTimes;
  const updateTimes = props.updateTimes;
  const tables = [
    [
      { id: 7, name: "Porch 1", reserved: false },
      { id: 8, name: "Porch 2", reserved: true },
      { id: 9, name: "Porch 3", reserved: false },
    ],
    [
      { id: 1, name: "Main 1", reserved: true },
      { id: 2, name: "Main 2", reserved: false },
      { id: 3, name: "Main 3", reserved: true },
      { id: 4, name: "Main 4", reserved: true },
      { id: 5, name: "Main 5", reserved: false },
      { id: 6, name: "Main 6", reserved: true },
    ],
    [
      { id: 10, name: "Garden 1", reserved: true },
      { id: 11, name: "Garden 2", reserved: false },
      { id: 12, name: "Garden 3", reserved: true },
    ],
  ];
  const [selectedTable, setSelectedTable] = useState({
    id: 0,
    name: "",
    reserved: false,
  });
  const [disable1, setDisable1] = useState("");
  const [disable2, setDisable2] = useState(" disable");
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    diners: "",
    occasion: "",
    table: selectedTable,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    setForm({ ...form, table: selectedTable });
  }, [selectedTable]);

  const location = useLocation();
  const { editForm } = location.state || {};
  useEffect(() => {
    if (editForm) {
      setForm(editForm);
      setSelectedTable(editForm.table);
    }
  }, [editForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    const submitted = props.onSubmit(form);
    setIsConfirmed(submitted);
    const reservations = props.reservations;
    if (reservations.find((res) => res.id === form.id)) {
      const updatedReservations = reservations.map((res) =>
        res.id === form.id ? form : res
      );
      props.setReservations(updatedReservations);
    } else {
      props.setReservations([...props.reservations, form]);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    updateTimes(new Date(form.date));
  }, [form.date]);

  return (
    <>
      {isModalOpen && (
        <ConfirmBooking
          form={form}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isConfirmed={isConfirmed}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <h1 id="form-title">Reserve a table</h1>
      <form onSubmit={handleSubmit}>
        <section className={"form-page-1" + disable1}>
          <label htmlFor="reservation-date">
            Reservation date:
            <input
              name="reservation-date"
              id="reservation-date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
              }}
            />
          </label>
          <div className="form-row">
            <label htmlFor="reservation-time">
              Reservation time:
              <select
                name="reservation-time"
                id="reservation-time"
                value={form.time}
                onChange={(e) => {
                  setForm({ ...form, time: e.target.value });
                }}
              >
                <option value="">Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="number-of-diners">
              Number of diners:
              <input
                name="number-of-diners"
                id="number-of-diners"
                placeholder="Select the number of diners (max 12)"
                type="number"
                min="1"
                max="12"
                value={form.diners}
                onChange={(e) => {
                  setForm({ ...form, diners: e.target.value });
                }}
              />
            </label>
          </div>
          <label htmlFor="Occasion">
            Occasion:
            <select
              name="Occasion"
              id="Occasion"
              value={form.occasion}
              onChange={(e) => {
                setForm({ ...form, occasion: e.target.value });
              }}
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <div className="map-legend">
            <div className="map-legend col">
              <div className="secondary-2 box-small"></div>
              <p>Reserved</p>
            </div>
            <div className="map-legend col">
              <div className="primary-2 box-small"></div>
              <p>Selected</p>
            </div>
            <div className="map-legend col">
              <div className="highlight box-small"></div>
              <p>Empthy</p>
            </div>
          </div>
          <label>Table Selection:</label>
          <label className="table-label" htmlFor="porch">
            <p>Porch</p>
          </label>
          <section className="tables">
            <TableSelection
              tables={tables[0]}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          </section>
          <label className="table-label" htmlFor="inside">
            <p>Main Hall</p>
          </label>
          <section className="tables">
            <TableSelection
              tables={tables[1]}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          </section>
          <label className="table-label" htmlFor="garden">
            <p>Garden</p>
          </label>
          <section className="tables">
            <TableSelection
              tables={tables[2]}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          </section>

          <button
            className="nav"
            type="nav"
            disabled={
              form.table.id === 0 ||
              form.Date === "" ||
              form.time === "" ||
              form.diners === "" ||
              form.occasion === "" ||
              form.diners > 12
                ? true
                : false
            }
            onClick={(e) => {
              e.preventDefault();
              setDisable1(" disable");
              setDisable2("");
            }}
          >
            <h4>Next Page</h4>
          </button>
        </section>

        <section className={"form-page-2" + disable2}>
          <label htmlFor="name">
            Name:
            <input
              name="name"
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
              }}
            />
          </label>
          <label htmlFor="email">
            {"Email (required):"}
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              required
            />
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              name="phone"
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
              }}
            />
          </label>
          <label htmlFor="special-requests">
            Special requests:
            <textarea
              name="special-requests"
              id="special-requests"
              placeholder="Please fill this field if you have any special requests"
              value={form.specialRequests}
              onChange={(e) => {
                setForm({ ...form, specialRequests: e.target.value });
              }}
            />
          </label>
          <button
            className="nav"
            type="nav"
            onClick={(e) => {
              e.preventDefault();
              setDisable1("");
              setDisable2(" disable");
            }}
          >
            <h4>Prev Page</h4>
          </button>
          <button type="submit">
            <h4>Submit</h4>
          </button>
        </section>
      </form>
    </>
  );
};

export default BookingForm;
