import Container from "react-bootstrap/Container";

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = (props) => {
  const { theme2 } = props;
  return (
    <>
      <Container className={`text-center text-${theme2}`} fluid>
        <footer className=" fixed-bottom text-center">
          <p>
            Ecommerce Site, {year()}
            <a
              href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"
              className={`text-${theme2}`}
            >
              <i className="fab fa-linkedin icon"></i>
            </a>
            <a href="mailto:zachobba@gmail.com" className={`text-${theme2}`}>
              <i className="fas fa-envelope-square icon"></i>
            </a>
            <a href="https://github.com/HobbaZ" className={`text-${theme2}`}>
              <i className="fab fa-github icon"></i>
            </a>
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Footer;
