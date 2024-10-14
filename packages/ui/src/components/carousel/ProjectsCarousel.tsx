import {PROJECTS_MAP} from "@bored/utils";
import "./carousel.css";
import {useNavigate} from "react-router-dom";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

export const ProjectsCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="carousel-container">
      {Object.values(PROJECTS_MAP).map((project) => (
        <Card
          key={project.path}
          elevation={3}
          className="card-container"
          id={project.name}
        >
          <CardActionArea
            onClick={() => navigate(project.path)}
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
  );
};
