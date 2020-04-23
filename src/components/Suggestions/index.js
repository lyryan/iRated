import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 230,
    position: "absolute",
  },
});

export default function TypographyMenu(props) {
  const classes = useStyles();
  const { results } = props;
  return (
    <>
      {results.length ? (
        <Paper className={classes.root}>
          <MenuList>
            {results.map((professor) => {
              return <MenuItem>{professor.name}</MenuItem>;
            })}
          </MenuList>
        </Paper>
      ) : null}
    </>
  );
}
