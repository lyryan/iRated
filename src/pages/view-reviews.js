import React from "react";
import axios from "axios";
import Card from "../components/Card";
import styles from "./view-reviews.module.css";
import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";

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
        <Button variant="outlined" color="primary">
          Add Review
        </Button>
      </div>
    );
  }
}

export default ViewReviews;
