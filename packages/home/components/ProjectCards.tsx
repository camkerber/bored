import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import "../../index.css";
import { PROJECTS_MAP } from "@cam-is-bored/utils";

export const ProjectCards = () => {
  const navigate = useNavigate();

  return (
    <>
      {Object.values(PROJECTS_MAP).map((project) => (
        <Card key={project.path} elevation={6} className="card-container">
          <Tooltip title={project.action} placement="bottom">
            <CardActionArea onClick={() => navigate(project.path)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Tooltip>
        </Card>
      ))}
    </>
  );
};

export default ProjectCards;
