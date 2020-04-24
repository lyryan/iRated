import React from "react";
import axios from "axios";
import { fade, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Suggestions from "../Suggestions";

const data = [
  { name: "thomas babu", school: "san jose state university" },
  { name: "austin thomas", school: "san jose state university" },
  { name: "rod fatoohi", school: "san jose state university" },
  { name: "frank lin", school: "san jose state university" },
];

const useStyles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", results: [] };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value }, () => this.getProfessors());
  };

  getProfessors = () => {
    axios
      .get("http://localhost:8080/dynamoDb", {
        params: {
          name: this.state.searchInput.toLowerCase(),
        },
      })
      .then(({ data }) => {
        console.log("this is the data", data);
        this.setState({
          results: data,
        });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              iRated
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={this.handleChange}
                value={this.state.searchInput}
              />
              {this.state.searchInput.length ? (
                <Suggestions results={this.state.results} />
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Header);
