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
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.hide();
  };

  render() {
    const { results, classes } = this.props;
    return (
      <Paper className={classes.root} ref={(node) => (this.node = node)}>
        <MenuList>
          {results.length ? (
            results.map((professor) => {
              // transform name to correct format
              professor.professorName = professor.professorName
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              return (
                <Link
                  to={`/view-reviews/${professor.professorId}`}
                  onClick={() => this.props.hide()}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem key={professor.professorId}>
                    {professor.professorName}
                  </MenuItem>
                </Link>
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
