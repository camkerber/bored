import {ProjectDetails, PROJECTS_MAP} from "@bored/utils";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ProjectsAccordion = () => {
  const navigate = useNavigate();
  const projectsMapValues = useMemo(() => Object.values(PROJECTS_MAP), []);
  const [expanded, setExpanded] = useState<string>("");

  const handleExpand =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      if (expanded === "") {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 200);
      }
      setExpanded(isExpanded ? panel : "");
    };

  const handleOpen = (project: ProjectDetails) => {
    if (project.pathIsHref) {
      window.open(project.path, "_blank")?.focus();
    } else {
      navigate(project.path);
    }
  };

  return (
    <div style={{maxWidth: "600px"}}>
      {projectsMapValues.map((project) => (
        <Accordion
          key={project.path}
          elevation={0}
          expanded={expanded === project.path}
          onChange={handleExpand(project.path)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${project.name}-content`}
            id={`${project.name}-header`}
          >
            <Typography variant="h5">{project.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{textAlign: "justify"}}>
              {project.description}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button
              onClick={() => handleOpen(project)}
              variant="outlined"
              size="large"
              disableElevation
            >
              Open
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
};
