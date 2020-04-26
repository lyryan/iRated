import React, { Component } from "react";

import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    display: "block",
  },
  text: {
    display: "block",
  },
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRating: 0,
      newContent: "",
    };
  }

  changeRating = (newRating) => {
    this.setState({ newRating });
  };

  changeContent = (e) => {
    e.preventDefault();
    this.setState({ newContent: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit({
      rating: this.state.newRating,
      content: this.state.newContent,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <form
        noValidate
        className={classes.root}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Write a review</h2>
          <StarRatings
            rating={this.state.newRating}
            starRatedColor="orange"
            changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
            starSpacing="0px"
            starHoverColor="orange"
          />
          <TextField
            className={classes.text}
            id="outlined-basic"
            variant="outlined"
            multiline
            placeholder="What did you like or dislike about this professor?"
            value={this.state.newContent}
            onChange={this.changeContent}
          />
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Form);
