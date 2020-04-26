import React from "react";
import axios from "axios";
import Card from "../components/Card";
import styles from "./view-reviews.module.css";
import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Form from "../components/Form";

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
});

class ViewReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professorDetails: {
        professorId: "",
        professorName: "",
        college: "",
        department: "",
        reviews: [],
      },
      showModal: false,
      overallRating: 0,
    };
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.professorId) {
      this.getProfessorDetails();
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.professorId !== prevProps.match.params.professorId
    ) {
      this.setState(
        {
          professorDetails: {
            professorId: "",
            professorName: "",
            college: "",
            department: "",
            reviews: [],
          },
        },
        this.getProfessorDetails()
      );
    }
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleSubmit = (newReview) => {
    this.handleModalClose();
    const { match } = this.props;
    const pid = match.params.professorId;

    axios({
      method: "put",
      url: `http://localhost:8080/dynamoDb`,
      data: newReview,
      params: {
        professorId: pid,
      },
    }).then((res) =>
      this.setState((prevState) => ({
        professorDetails: {
          ...prevState,
          reviews: [...prevState.professorDetails.reviews, res.data],
        },
      }))
    );
  };

  getProfessorDetails = () => {
    const { match } = this.props;
    const pid = match.params.professorId;

    axios
      .get("http://localhost:8080/dynamoDb", {
        params: {
          professorId: pid,
        },
      })
      .then(({ data }) => {
        // change name to proper format
        data.professorName = data.professorName
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");

        const overallRating = data.reviews.length
          ? parseFloat(
              data.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                data.reviews.length
            )
          : 0;
        this.setState({
          professorDetails: data,
          overallRating,
        });
      });
  };

  renderCards = () => {
    return this.state.professorDetails.reviews.map((review, index) => {
      return <Card key={review.reviewId} data={review} />;
    });
  };

  render() {
    const { professorDetails } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={styles.header}>
          <h1>{professorDetails.professorName}</h1>
          {professorDetails.college} - {professorDetails.department}
          <div>
            <StarRatings
              rating={this.state.overallRating}
              starRatedColor="orange"
              numberOfStars={5}
              starSpacing="0px"
            />
          </div>
        </div>
        <div className={styles.cards}>{this.renderCards()}</div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleModalOpen}
        >
          Add Review
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.showModal}
          onClose={this.handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide in={this.state.showModal} timeout={300}>
            <Form submit={(newReview) => this.handleSubmit(newReview)} />
          </Slide>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(ViewReviews);
