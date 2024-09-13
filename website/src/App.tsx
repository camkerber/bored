import {Container} from "@mui/material";
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import "@bored/styles"

const App = () => {
  return (
    <>
      <Header />
      <Container className='outlet-container'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
