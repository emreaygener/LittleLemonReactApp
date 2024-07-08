import Card from "./Card";
import "./Testimonials.css";
import tilly from "../../assets/img/tilly.png";
import samuel from "../../assets/img/samuel.jpeg";
import emma from "../../assets/img/emma.jpg";
import ted from "../../assets/img/ted.jpg";

const Testimonials = () => {
  const CardsInfo = [
    {
      img: tilly,
      name: "Tilly",
      comment: "Delicious flavors, warm ambiance, unforgettable experience!",
    },
    {
      img: samuel,
      name: "Samuel",
      comment: "Authentic flavors, truly delightful experience.",
    },
    {
      img: emma,
      name: "Emma",
      comment: "Exquisite taste, highly recommended.",
    },
    {
      img: ted,
      name: "Ted",
      comment: "Simply outstanding!",
    },
  ];
  return (
    <section className="testimonials-frame">
      <div className="testimonials">
        <div className="stripe"></div>
        <div className="frame">
          <h2>Testimonials</h2>
          <div className="testimonials-container">
            <Card cardinfo={CardsInfo[0]} />
            <Card cardinfo={CardsInfo[1]} />
            <Card cardinfo={CardsInfo[2]} />
            <Card cardinfo={CardsInfo[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
