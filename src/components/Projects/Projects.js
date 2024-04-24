import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import postgresql from "../../Assets/Projects/PostegreSQL.png";
import tipe from "../../Assets/Projects/tipe.png";
import myjobglasses from "../../Assets/Projects/myjobglasses.png";
import reveasy from "../../Assets/Projects/reveasy.png";
import manuel from "../../Assets/Projects/Manuel_Utilisateur.pdf";
import mjgcertificate from "../../Assets/Projects/myjobglasses_orientation_certificate.pdf";



function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={reveasy}
              title="Learning app: RevEasy"
              description="We developed an application as part of group project that aims to enable any student to create review sheets within the application. Thus, the student can revise these sheets by utilizing quizzes generated from the information they have inputted into the files.."
              ghLink="https://github.com/PSOMSON/RevEasy"
              file={manuel}
              fileText="User Manuel"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={postgresql}
              title="A PostgreSQL Administrator"
              description="PostgreSQL Browser is a web-based PostgreSQL database admin tool written in python using Flask, HTML, CSS, JavaScript. It is a tool that will help you view your database from Heroku and edit them directly with a more friendly interface. This project was part of my final project to validate my cs50x certification."
              demoLink="https://spark.adobe.com/video/rv3QwkwFtNMfx"
              ghLink="https://github.com/Abdelmouhaimen/browser"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tipe}
              title="TIPE : Heart Rate Monitor"
              description="Supervised personal initiative project or TIPE is a common test to most entrance examinations to the Grandes Ecoles of Science. During my preparatory classes, I made a heart rate monitor as a project for my TIPE. The device measured heart rate using a technique called Photoplethysmography. I had to make the sensor using IR LED also photodiode, also I had make the electronic circuit to ensure the output contains only the alternative signal from heart pulse. Finally I did the post-processing using Arduino kit to visualise the heart rate."
            />
          </Col>





        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
