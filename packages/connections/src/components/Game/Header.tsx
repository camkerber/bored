import {Typography} from "@mui/material";

interface HeaderProps {
  title?: string;
  author?: string;
}

export const Header = ({title, author}: HeaderProps) => {
  return (
    <>
      <Typography variant="h3" sx={{textAlign: "center"}}>
        {title ?? "Connections"}
      </Typography>
      {author ? (
        <Typography variant="body1">Created by: {author}</Typography>
      ) : null}
      <Typography variant="body2" sx={{mt: 1, mb: 2}}>
        Select 4 options with a connection then click submit.
      </Typography>
    </>
  );
};
