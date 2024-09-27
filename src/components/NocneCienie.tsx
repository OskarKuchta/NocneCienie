import React, { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { Tooltip } from "react-tooltip";

interface AboutMain {
  url: string;
  onClick: () => void;
}

const AboutMain: React.FC<AboutMain> = ({ url, onClick }) => {
  const { data } = useFetch(url);
  const [hide, setHide] = useState<string>("hide");
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const copyTag = () => {
    if (isBlocked) {
      return;
    }
    setShowTooltip(false);
    setHide("");
    setIsBlocked(true);
    navigator.clipboard.writeText(data.tag);
    setTimeout(() => {
      setHide("hide");
      setIsBlocked(false);
      setShowTooltip(true);
    }, 2000);
  };
  if (data) {
    return (
      <section id="home" className="about">
        <div className="about__left">
          <h1 className="about__left--header">
            Witamy na stronie klanu Dobry Klan. Jesteśmy zgraną ekipą, która gra
            ze sobą od lat w przyjaznej atmosferze i aktualnie jest nas{" "}
            {data.members} osób. Jeżeli posiadasz TH 14+ zapraszamy w nasze
            skromne progi. Jeżeli zaś posiadasz niższe TH zapraszamy do naszej
            akademii.
          </h1>
          <button
            onClick={onClick}
            className="about__left--button"
          >
            AKADEMIA
          </button>
        </div>
        <div className="about__right">
          <img src={data.badgeUrls.medium} alt="logo Dobry Klan" />
          <h2 className="about__right--clanName">Dobry Klan</h2>
          <div className="about__right--clan">
            <p
              className="about__right--clan-tag"
              onClick={copyTag}
              data-tooltip-id="tooltip-main"
              data-tooltip-content="Kliknij, żeby skopiować!"
            >
              #Y09R909
            </p>
            <p className={`about__right--clan-popup ${hide}`}>
              Tekst skopiowany do schowka.
            </p>
          </div>
        </div>
        {showTooltip && (
          <Tooltip id="tooltip-main" place="bottom" delayShow={100} />
        )}
      </section>
    );
  }
};
export default AboutMain;
