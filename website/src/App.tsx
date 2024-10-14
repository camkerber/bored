import {Container} from "@mui/material";
import {Header} from "@bored/ui";
import {Outlet} from "react-router-dom";
import "@bored/styles";

export const App = () => {
  return (
    <>
      <Header />
      <Container className="outlet-container">
        <Outlet />
      </Container>
    </>
  );
};
