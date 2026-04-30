import {ProjectDetails, PROJECTS_MAP} from "@bored/utils";
import {useNavigate} from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import {Carousel, useCarousel} from "./carousel";

const PROJECTS_VALUES = Object.values(PROJECTS_MAP);
const PROJECT_IDS = PROJECTS_VALUES.map((project) => project.name);

export const ProjectsCarousel = () => {
  const navigate = useNavigate();
  const {containerRef, itemRefs, focusedItemId, handleDotClick} = useCarousel({
    defaultFocusedItemId: PROJECTS_VALUES[0].name,
    itemIds: PROJECT_IDS,
  });

  const handleCardClick = (project: ProjectDetails) => {
    if (project.pathIsHref) {
      window.open(project.path, "_blank")?.focus();
    } else {
      navigate(project.path);
    }
  };

  return (
    <Box sx={{mt: 4, width: "100%"}}>
      <Carousel
        containerRef={containerRef}
        focusedItemId={focusedItemId}
        itemIds={PROJECT_IDS}
        onClickDot={handleDotClick}
        dotsColor="primary"
      >
        {PROJECTS_VALUES.map((project, index) => (
          <Card
            key={project.path}
            elevation={0}
            className="carousel-card-container"
            id={project.name}
            ref={(el) => {
              itemRefs.current[index] = el;
              return () => {
                itemRefs.current[index] = null;
              };
            }}
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
    </Box>
  );
};
