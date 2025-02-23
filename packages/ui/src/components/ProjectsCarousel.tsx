import {ProjectDetails, PROJECTS_MAP, useDebounce} from "@bored/utils";
import {useNavigate} from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Lens from "@mui/icons-material/Lens";
import TripOrigin from "@mui/icons-material/TripOrigin";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

/**
 * TODO: refactor this into a reusable carousel and dots
 */

export const ProjectsCarousel = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const projectsMapValues = useMemo(() => Object.values(PROJECTS_MAP), []);

  const [focusedCard, setFocusedCard] = useState(PROJECTS_MAP.connections.name);
  const debouncedSetFocusedCard = useDebounce(
    (value: string) => setFocusedCard(value),
    50,
  );

  const handleCardClick = (project: ProjectDetails) => {
    if (project.pathIsHref) {
      window.open(project.path, "_blank")?.focus();
    } else {
      navigate(project.path);
    }
  };

  const handleSelectorClick = (projectName: string, projectIndex: number) => {
    setFocusedCard(projectName);
    cardRefs.current[projectIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const centerPosition = scrollLeft + containerWidth / 2;
      const offsetLeft = container.offsetLeft;

      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const itemLeft = cardRef.offsetLeft - offsetLeft;
          const itemWidth = cardRef.offsetWidth;

          if (
            itemLeft < centerPosition &&
            itemLeft + itemWidth > centerPosition
          ) {
            const centerCard = projectsMapValues[index].name;
            debouncedSetFocusedCard(centerCard);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsMapValues]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scrollend", handleScroll);
      container.addEventListener("touchend", handleScroll); // mobile

      return () => {
        container.removeEventListener("scrollend", handleScroll);
        container.removeEventListener("touchend", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <>
      <div className="carousel-container" ref={containerRef}>
        {projectsMapValues.map((project, index) => (
          <Card
            key={project.path}
            elevation={3}
            className="carousel-card-container"
            id={project.name}
            ref={(el) => (el ? (cardRefs.current[index] = el) : null)}
          >
            <CardActionArea
              onClick={() => handleCardClick(project)}
              sx={{height: "100%"}}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <div className="carousel-selectors">
        {projectsMapValues.map((project, index) => (
          <IconButton
            key={project.path}
            size="small"
            onClick={() => handleSelectorClick(project.name, index)}
          >
            {project.name === focusedCard ? <Lens /> : <TripOrigin />}
          </IconButton>
        ))}
      </div>
    </>
  );
};
