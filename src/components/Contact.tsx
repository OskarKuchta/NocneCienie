import React from "react";

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="contact">
      <section className="contact__header">
        <h2 className="contact__header--text">Kontakt z nami: </h2>{" "}
        <i className="fa-solid fa-envelope contact__header--envelope"></i>
      </section>
      <section className="contacts">
        <div className="contacts__discord">
          <i className="fa-brands fa-discord contacts__discord--icon"></i>
          <a
            className="contacts__discord--link"
            href="https://discord.gg/AaJ6qcw6Zs"
            target="blank"
          >
            Główny discord klanu
          </a>
        </div>
        <div className="contacts__facebook">
          <i className="fa-brands fa-square-facebook contacts__facebook--icon"></i>
          <a
            className="contacts__facebook--link"
            href="https://www.facebook.com/tomek.kowalczyk.353803"
            target="blank"
          >
            Lider Głównego klanu
          </a>
        </div>
        <div className="contacts__facebook">
          <i className="fa-brands fa-square-facebook contacts__facebook--icon"></i>
          <a
            className="contacts__facebook--link"
            href="https://www.facebook.com/anna.m.chabuda"
            target="blank"
          >
            Lider Akademii
          </a>
        </div>
        <div className="contacts__facebook">
          <i className="fa-brands fa-square-facebook contacts__facebook--icon"></i>
          <a
            className="contacts__facebook--link"
            href="https://www.facebook.com/oskar.kuchta.39/"
            target="blank"
          >
            Administrator strony
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Contact;
