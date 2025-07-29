import {Container, Typography} from "@mui/material";

export const IntroContent = () => {
  return (
    <Container
      disableGutters
      className="flex-column"
      sx={{
        mb: 4,
      }}
    >
      <Typography variant="h5" sx={{mb: 1}}>
        About
      </Typography>
      <Typography variant="body1" sx={{fontSize: "18px", textAlign: "justify"}}>
        Welcome! I am a frontend software engineer with 5 years of experience
        building enterprise and consumer applications using TypeScript, React,
        and GraphQL. In my freetime I enjoy coding for fun, so below are some
        projects I built out of curiosity that you can check out.
      </Typography>
    </Container>
  );
};
