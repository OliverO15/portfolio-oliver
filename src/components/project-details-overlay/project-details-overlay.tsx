import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Project } from "../../types/globals";
import "./project-details-overlay.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const ProjectDetailsOverlay = (props: any) => {
  const isOpen = props.isOpen;
  const project: Project = props.project;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = previousOverflow || "";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, props]);

  if (!project) {
    return null;
  }

  return (
    <div
      className={"project-details-overlay " + (isOpen ? "open" : "closed")}
      onClick={props.onClose}
    >
      <div
        className="project-details-content"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the overlay
      >
        <div className="content column g-30">
          <h1>{project ? project.title : "No project selected"}</h1>
          <FontAwesomeIcon
            id="close-overlay-button"
            icon={faXmark}
            onClick={props.onClose}
          />
          <div className="project-images">
            <div className="row g-0" style={{ height: "100%" }}>
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="column description-tools">
            <p style={{ whiteSpace: "pre-wrap" }}>{project.description}</p>
            <h3>Technologies Used:</h3>
            <div className="row warp tools-list">
              {project.technologies.map((technology, index) => (
                <div className="row">
                  <span key={index}>{technology}</span>
                  {index < project.technologies.length - 1 && (
                    <span className="role-tag">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsOverlay;
