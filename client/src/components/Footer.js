import { useContext } from "react";
import { ThemeContext } from "../Theme";

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <footer className={` mt-5 text-center`}>
        <p>
          Ecommerce Site, {year()}
          <a
            href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"
            title="Zac Hobba Linkedin"
            className={`background ${theme}`}
          >
            <i className="fab fa-linkedin icon"></i>
          </a>
          <a
            href="mailto:zachobba@gmail.com"
            title="Zac Hobba email"
            className={`background ${theme}`}
          >
            <i className="fas fa-envelope-square icon"></i>
          </a>
          <a
            href="https://github.com/HobbaZ"
            title="Zac Hobba Github"
            className={`background ${theme}`}
          >
            <i className="fab fa-github icon"></i>
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
