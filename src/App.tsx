import "./App.css";
import Navbar from "./components/navbar/navbar";
import ProjectCard from "./components/project-card/project-card";
import projectsData from "../public/projects.json";
import type { Project } from "./types/globals";
import { useState } from "react";
import ProjectDetailsOverlay from "./components/project-details-overlay/project-details-overlay";

function App() {
  const projects: Project[] = projectsData;
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectOverlayOpen, setProjectOverlayOpen] = useState(false);

  const handleSetCurrentProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setProjectOverlayOpen(true);
  };

  const handleCloseProject = () => {
    setProjectOverlayOpen(false);
  };

  return (
    <>
      <Navbar />
      <section id="about">
        <div className="row g-30">
          <img
            id="about-image"
            src="/oliver_portrait.avif"
            alt="Picture of me"
          />
          <div className="column" style={{ textAlign: "left" }}>
            <h3>About Me</h3>
            <p>
              I’m a designer and developer from Iceland with a background in
              visual design and computer science. I focus on UI/UX and
              interactive system design, and I enjoy building digital products
              where usability, structure, and technology come together. I
              recently graduated with a B.Sc. in Computer Science and have
              professional experience designing and developing user interfaces
              for real products and real users.
            </p>
          </div>
        </div>
      </section>
      <section id="projects" className="column g-30">
        <h1>Projects</h1>
        <p>Mixture of personal, professional work.</p>
        <div className="projects-container">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onOpenProject={handleOpenProject}
              setCurrentProject={handleSetCurrentProject}
            />
          ))}
        </div>
      </section>
      {/* <section id="photography" style={{ height: "600px" }}>
        <h1>Photography</h1>
        <p>Mixture of personal, professional work.</p>
      </section> */}
      <p>Contact at: oliverormar5@gmail.com</p>
      <ProjectDetailsOverlay
        isOpen={projectOverlayOpen}
        project={currentProject}
        onClose={handleCloseProject}
      />
    </>
  );
}

export default App;
