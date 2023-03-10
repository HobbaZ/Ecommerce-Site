import Container from "react-bootstrap/Container";
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
      <Container fluid>
        <footer className={`background ${theme} fixed-bottom text-center`}>
          <p>
            Ecommerce Site, {year()}
            <a
              href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"
              className={`background ${theme}`}
            >
              <i className="fab fa-linkedin icon"></i>
            </a>
            <a
              href="mailto:zachobba@gmail.com"
              className={`background ${theme}`}
            >
              <i className="fas fa-envelope-square icon"></i>
            </a>
            <a
              href="https://github.com/HobbaZ"
              className={`background ${theme}`}
            >
              <i className="fab fa-github icon"></i>
            </a>
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Footer;
