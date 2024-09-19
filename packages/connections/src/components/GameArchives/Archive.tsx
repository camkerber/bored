import {useGetPageOfGames} from "@bored/api";
import {Container, List, ListItem, ListItemText} from "@mui/material";
import {useEffect} from "react";

export const Archive = () => {
  const {data, getNextPage} = useGetPageOfGames(10);
  console.log("data from provider:", data);

  useEffect(() => {
    getNextPage()
      .then(() => {})
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {data ? (
        <List>
          {data.map((game) => {
            return (
              <ListItem key={game.id}>
                <ListItemText>{game.title}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Container>
  );
};
