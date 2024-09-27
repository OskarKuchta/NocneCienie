import { useEffect, useState } from "react";

const ToogleURL = () => {
  const changeToMain = () => {
    setAk(false);
    setMain(true);
  };
  const changeToAk = () => {
    setMain(false);
    setAk(true);
  };
  const [showContact, setShowContact] = useState<boolean>(false);
  useEffect(() => {
    const load: NodeJS.Timeout = setTimeout(() => {
      setShowContact(true);
    }, 1500);
    return () => {
      clearTimeout(load);
    };
  });
  const [main, setMain] = useState<boolean>(true);
  const [ak, setAk] = useState<boolean>(false);
  const urlMain: string =
    "https://dobry-klan.netlify.app/.netlify/functions/server/clan/main";
  const urlAk: string =
    "https://dobry-klan.netlify.app/.netlify/functions/server/clan/main"; // linki do serwera

  // const urlMain: string = "api/v1/clans/%23Y09R909";
  // const urlAk: string = "api/v1/clans/%232qupvlcgc"; // linki proxy

  return { changeToMain, changeToAk, showContact, main, ak, urlMain, urlAk };
};

export default ToogleURL;
