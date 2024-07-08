import "./Chicago.css";
import imga from "../../assets/img/Mario and Adrian A.jpg";
import imgb from "../../assets/img/Mario and Adrian b.jpg";

const Chicago = () => {
  return (
    <section className="chicago-container">
      <article className="chicago">
        <article className="chicago-text">
          <div id="text-limiter">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Chicago is the third most populous city in the United States. It
              is located in the state of Illinois. Chicago is known for its
              architecture, museums, and history. The city is home to many
              famous landmarks, including the Willis Tower, the Art Institute of
              Chicago, and Navy Pier. Chicago is also known for its sports
              teams, such as the Chicago Cubs and the Chicago Bulls. The city
              has a rich cultural scene, with many theaters, music venues, and
              restaurants. Chicago is a great place to visit for anyone who
              loves history, art, or sports.
            </p>
          </div>
        </article>
        <div className="chicago-images">
          <img id="img-a" src={imga} alt="Chicago" />
          <img id="img-b" src={imgb} alt="Chicago" />
        </div>
      </article>
    </section>
  );
};

export default Chicago;
