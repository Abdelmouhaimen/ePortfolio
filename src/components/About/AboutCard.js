import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Abdelmouhaimen Sarhane </span>
            <br />I am a second year computer science engineering student at INP-ENSEEIHT specialized in Image and Multimedia.  Interested in Artificial Intelligence, Data science and Computer vision because of the mixture of applied mathematics, image processing, data analysis and software engineering. My curiosity towards science and new technologies is growing and supports my engagement to broaden my knowledge and build my skills.


            <br />
            <br />This portfolio seeks to best convey my character, my professional trajectory, and my future goals. You can find information about my experiences, initiatives, and skills, both professionally and personally. Please get in touch with me if you want additional information about my experience or the projects I worked on.
            <br />
            <br />
            <br />Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Coding
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(96, 136, 224)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Abdelmouhaimen</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
