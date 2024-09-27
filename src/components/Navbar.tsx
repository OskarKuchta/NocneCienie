import { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.webp";

const Navbar: React.FC = () => {
  interface Functions {
    (): void;
  }
  type hoverType = {
    backgroundColor: string;
  };
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const hamburger = hamburgerRef.current;

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMenu(false);
        setIsClicked(false);
      }
    };

    document.addEventListener("keyup", handleEscapeKey);

    return () => {
      document.removeEventListener("keyup", handleEscapeKey);
    };
  }, []);
  const handleHover: Functions = () => {
    setIsHovered(true);
  };
  const handleMouseLeave: Functions = () => {
    setIsHovered(false);
  };
  const hoverStyles: hoverType = {
    backgroundColor: isHovered ? "#216ECC" : "rgb(235, 218, 218)",
  };
  const RemoveFocus = (num: number) => {
    setTimeout(() => {
      setIsHovered(false);
    }, num);
  };
  const toggleMenu: Functions = () => {
    setShowMenu(!showMenu);
    setIsClicked(!isClicked);
  };
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, a: number) => {
    e.preventDefault();
    const targetId: string | null = e.currentTarget.getAttribute("href");
    if (targetId) {
      const targetElement: HTMLElement = document.querySelector(
        targetId
      ) as HTMLElement;
      if (targetElement) {
        const targetPosition: number = targetElement.offsetTop - a;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        hamburger.focus();
      }
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img
          className="navbar__left--photo"
          src={logo}
          alt="logo Dobry Klan"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <span className="navbar__left--name">DOBRY KLAN</span>
      </div>
      <div className="navbar__right">
        <ul className={`lists ${showMenu ? "show" : ""}`}>
          <li className="navbar__right--element hover">
            <a href="#home" onClick={(e) => handleScroll(e, 300)}>
              HOME
            </a>
          </li>
          <li className="navbar__right--element hover">
            <a href="#stats" onClick={(e) => handleScroll(e, 100)} z-index={10}>
              STATS
            </a>
          </li>
          <li className="navbar__right--element hover">
            <a href="#contact" onClick={(e) => handleScroll(e, 200)}>
              CONTACT
            </a>
          </li>
        </ul>
        <div
          className="navbar__right--hamburger-container"
          onClick={toggleMenu}
          ref={hamburgerRef}
          tabIndex={0}
          onFocus={() => setIsHovered(true)}
          onBlur={() => RemoveFocus(0)}
          onKeyDown={(e) => {
            if (e.key === "m") {
              toggleMenu();
            }
            if (e.key === "Enter") {
              setIsClicked(true);
              setShowMenu(true);
            }
            if (e.key === "Escape") {
              setIsClicked(false);
              setShowMenu(false);
            }
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`navbar__right--hamburger-menu ${
              isClicked ? "active" : ""
            }`}
          >
            <span
              className={`first-line ${isClicked ? "first" : ""}`}
              style={isHovered ? { backgroundColor: "#216ECC" } : hoverStyles}
            ></span>
            <span
              style={isHovered ? { backgroundColor: "#216ECC" } : hoverStyles}
              className={`second-line ${isClicked ? "second" : ""}`}
            ></span>
            <span
              style={isHovered ? { backgroundColor: "#216ECC" } : hoverStyles}
              className={`third-line ${isClicked ? "third" : ""}`}
            ></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
