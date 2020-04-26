import React from "react";

import { Link } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    width: 230,
    position: "absolute",
  },
});

class TypographyMenu extends React.Component {
  render() {
    const { results, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <MenuList>
          {results.length ? (
            results.map((professor) => {
              // transform name to correct format
              professor.professorName = professor.professorName
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              return (
                <MenuItem key={professor.professorId}>
                  <Link to={`/view-reviews/${professor.professorId}`}>
                    {professor.professorName}
                  </Link>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem>No results found</MenuItem>
          )}
        </MenuList>
      </Paper>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(TypographyMenu);
