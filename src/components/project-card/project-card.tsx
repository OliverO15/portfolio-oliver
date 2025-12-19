import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Project } from "../../types/globals";
import "./project-card.css";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = (props: any) => {
  const project: Project = props.project;

  return (
    <div
      className={"project-card reveal " + project.aspectRatio}
      onClick={() => props.onOpenProject(project)}
      onMouseEnter={() => props.setCurrentProject(project)}
    >
      <img
        src={project.featuredImage}
        alt={`${project.title} featured image`}
      />
      <div className="bottom-banner row">
        <div className="column g-5">
          <h5>{project.title}</h5>
          <div className="row">
            {project.roles.map((role, index) => (
              <div className="row">
                <span key={index}>{role}</span>
                {index < project.roles.length - 1 && (
                  <span className="role-tag">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <FontAwesomeIcon id="info-icon" icon={faInfo} />
      </div>
    </div>
  );
};

export default ProjectCard;
