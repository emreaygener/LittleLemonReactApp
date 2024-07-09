import BookingForm from "./BookingForm";

const BookingPage = (props) => {
  return (
    <>
      <BookingForm availableTimes={props.availableTimes} />
    </>
  );
};

export default BookingPage;
