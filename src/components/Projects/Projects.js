import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import postgresql from "../../Assets/Projects/PostegreSQL.png";
import tipe from "../../Assets/Projects/tipe.png";
import reveasy from "../../Assets/Projects/reveasy.png";
import manuel from "../../Assets/Projects/Manuel_Utilisateur.pdf";
import trafficlights from "../../Assets/Projects/trafficlights.png";
import maps from "../../Assets/Projects/maps.png";
import retailanalysis from "../../Assets/Projects/retailanalysis.png";
import PI3D from "../../Assets/Projects/PI3D.png";
import PI3D_slides from "../../Assets/Projects/PI3D_slides.pdf";
import clic from "../../Assets/Projects/clic.png";




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
            imgPath={clic}
            title="Compressed Sensing-Based Smart Camera"
            description="Developed an adaptive image sampling and reconstruction system for drone-based transmissions using Compressed Sensing and Deep Learning. Designed deep neural networks for optimized mask generation (NetM) and inpainting-based reconstruction (NetE). Integrated real-time mask refinement, ensuring efficient bandwidth usage in constrained environments. Implemented a Streamlit-based graphical interface for real-time monitoring and visualization."
            ghLink="https://github.com/Abdelmouhaimen/CLIC"
          />
        </Col>

        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={PI3D}
            title="3D Projector Pose Adjustment - Grotte Chauvet"
            description="Developed a computer vision system for precise alignment of prehistoric paintings onto a replica of the Chauvet Cave. Utilized Structure-from-Motion (SfM) and Multi-View Stereo (MVS) to reconstruct a 3D model of the replica. Implemented Zhang's method for projector calibration, treating the projector as an inverted camera. Applied Iterative Closest Point (ICP) and scale correction to align the reconstructed model with the original cave structure. This project optimizes projection accuracy and reduces manual positioning errors."
            ghLink="https://github.com/Abdelhakimourkia/BE_Pi_3D"
            file={PI3D_slides}
            fileText="Slides"
          />
        </Col>


        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={retailanalysis}
            title="Customer Behavior Analysis Using Computer Vision"
            description="Developed a Computer Vision system leveraging YOLO, Roboflow, and Supervision library to track customer behavior in retail spaces. Implemented 2D perspective transformation for heatmap generation and worked on multi-camera tracking and re-identification models to analyze customer interactions and optimize store layouts."
            ghLink="https://github.com/Abdelmouhaimen/Behavior_Analysis_YOLO"
          />
        </Col>


        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={maps}
            title="3D Surface Compression and Remeshing using MAPS"
            description="Developed a Multiresolution Adaptive Parameterization of Surfaces (MAPS) approach for 3D mesh compression and remeshing. Implemented progressive vertex removal, constrained Delaunay retriangulation, and adaptive parameterization to optimize mesh complexity while preserving topology. Achieved O(N log N) efficiency for large-scale 3D models, with applications in 3D scanning, texturing, and morphing."
            ghLink="https://github.com/Abdelmouhaimen/CSI_3D_MAPS_N7"
          />
        </Col>




        <Col md={4} className="project-card">
          <ProjectCard
            imgPath={trafficlights}
            title="Traffic Sign Recognition using Deep Learning"
            description="Developed a deep learning-based model for detecting and classifying traffic signs using convolutional neural networks (CNNs). The project involved data collection via web scraping and manual acquisition, model optimization using VGG16 fine-tuning, and performance analysis with accuracy reaching 92.9%."
            ghLink="https://github.com/Abdelmouhaimen/DL-TrafficSignClassification"
          />
        </Col>

            
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
