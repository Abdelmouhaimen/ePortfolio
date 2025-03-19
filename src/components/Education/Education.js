import React from "react";
import VerticalTimeline from "./VerticalTimeline";
import VerticalTimelineElement from "./VerticalTimelineElement";
import './VerticalTimeline.css';
import './VerticalTimelineElement.css';
import { IoMdSchool, IoMdBriefcase } from "react-icons/io";
import rapportEnac from "../../Assets/RapportENAC.pdf";

function Education() {
  return (
    <VerticalTimeline>

      {/* Research Engineer Intern - GET-OMP */}
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(17, 75, 122)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(17, 75, 122)' }}
        date="June 2024 - September 2024"
        iconStyle={{ background: 'rgb(17, 75, 122)', color: '#fff' }}
        icon={<IoMdBriefcase />}
        ghLink="https://github.com/Abdelmouhaimen/DL4SahelLakes/"
      >
        <h3 className="vertical-timeline-element-title">Research Engineer Intern - Deep Learning</h3>
        <h4 className="vertical-timeline-element-subtitle">GET-OMP, CNRS, France</h4>
        <p>
          Developed a CNN U-Net model with attention mechanisms for detecting and analyzing water bodies in West Africa using Landsat satellite images.  
          Achieved an F1-score of 94%, optimized geospatial pipelines, and contributed to sustainable water resource management.
        </p>
      </VerticalTimelineElement>

      {/* HPC Developer Intern - ENAC */}
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(17, 75, 122)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(17, 75, 122)' }}
        date="June 2023 - July 2023"
        iconStyle={{ background: 'rgb(17, 75, 122)', color: '#fff' }}
        icon={<IoMdBriefcase />}
        file={rapportEnac}
        fileText="Rapport de Stage"
        ghLink="https://github.com/abdelmouhaimen/NRJ"
      >
        <h3 className="vertical-timeline-element-title">HPC Developer and Data Analyst Intern</h3>
        <h4 className="vertical-timeline-element-subtitle">ENAC, Toulouse, France</h4>
        <p>
          A 6-week internship on "Evaluating Energy Consumption in Matrix Computations Using Compressed Data." 💻📚 During this journey, I explored advanced scientific computing techniques and sustainable solutions for handling massive data sets.
          I contributed to a scientific publication accepted at ICT4S 2024. <a href="https://ieeexplore.ieee.org/document/10805437">IEEE link</a>

        </p>
      </VerticalTimelineElement>

      {/* ENSEEIHT - Specialized in Image & Multimedia */}
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2022 - Present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<IoMdSchool />}
      >
        <h3 className="vertical-timeline-element-title">ENSEEIHT - SN | Computer Science Student</h3>
        <h4 className="vertical-timeline-element-subtitle">Toulouse, France</h4>
        <p>
        I joined The École nationale supérieure d'électrotechnique, d'électronique, d'informatique, d'hydraulique et des télécommunications (ENSEEIHT) which is a French engineering school (Grande École) which offers Computer Science and Telecommunications., specializing in Image and Multimedia.
        Gained expertise in Computer Vision, Image Processing, 3D Reconstruction, and Deep Learning.
        </p>
      </VerticalTimelineElement>

      {/* CPGE Saint-Benoit - MPSI/PSI */}
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2020 - 2022"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<IoMdSchool />}
      >
        <h3 className="vertical-timeline-element-title">CPGE Saint-Benoit Angers | MPSI-PSI</h3>
        <h4 className="vertical-timeline-element-subtitle">Angers, France</h4>
        <p>
          Intensive preparatory program covering **mathematics, physics, computer science**, and **industrial sciences**.  
          Prepared for competitive engineering school entrance exams.
        </p>
      </VerticalTimelineElement>

      {/* High School Diploma */}
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2020"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<IoMdSchool />}
      >
        <h3 className="vertical-timeline-element-title">High School Diploma | Mention Très Bien</h3>
        <h4 className="vertical-timeline-element-subtitle">Casablanca, Morocco</h4>
        <p>
          **Specialization:** Science Mathématiques B  
          Graduated with highest honors.
        </p>
      </VerticalTimelineElement>

    </VerticalTimeline>
  );
}

export default Education;
