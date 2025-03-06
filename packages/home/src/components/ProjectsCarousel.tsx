import {ProjectDetails, PROJECTS_MAP} from "@bored/utils";
import {useNavigate} from "react-router-dom";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useMemo} from "react";
import {Carousel} from "@bored/ui/src/components/carousel/Carousel";
import {useCarousel} from "@bored/ui/src/components/carousel/useCarousel";

export const ProjectsCarousel = () => {
  const navigate = useNavigate();
  const projectsMapValues = useMemo(() => Object.values(PROJECTS_MAP), []);
  const projectIds = useMemo(
    () => projectsMapValues.map((project) => project.name),
    [projectsMapValues],
  );
  const {containerRef, itemRefs, focusedItemId, handleDotClick} = useCarousel({
    defaultFocusedItemId: projectsMapValues[0].name,
    itemIds: projectsMapValues.map((project) => project.name),
  });

  const handleCardClick = (project: ProjectDetails) => {
    if (project.pathIsHref) {
      window.open(project.path, "_blank")?.focus();
    } else {
      navigate(project.path);
    }
  };

  return (
    <Carousel
      containerRef={containerRef}
      focusedItemId={focusedItemId}
      itemIds={projectIds}
      onClickDot={handleDotClick}
    >
      {projectsMapValues.map((project, index) => (
        <Card
          key={project.path}
          elevation={3}
          className="carousel-card-container"
          id={project.name}
          ref={(el) => (el ? (itemRefs.current[index] = el) : null)}
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
    </Carousel>
  );
};
