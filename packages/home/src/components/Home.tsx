import {IntroContent} from "..";
import {ProjectsAccordion} from "./ProjectsAccordion";

export const Home = () => {
  return (
    <div className="home-container">
      <IntroContent />
      <ProjectsAccordion />
    </div>
  );
};
