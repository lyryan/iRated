import React from 'react';
import axios from 'axios';

class ViewReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professorDetails: {
        professorId: '',
        professorName: '',
        college: '',
        department: '',
      },
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
            professorId: '',
            professorName: '',
            college: '',
            department: '',
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
      .get('http://localhost:8080/dynamoDb', {
        params: {
          professorId: pid,
        },
      })
      .then(({ data }) => {
        this.setState({
          professorDetails: data,
        });
      });
  };

  render() {
    const { professorDetails } = this.state;
    //const professorDetails = this.props.data;
    // console.log('match prop', this.props.match);
    // console.log('selected professor is', this.props.data);
    return (
      <div>
        <div>Professor ID: {professorDetails.professorId}</div>
        <div>Professor Name: {professorDetails.professorName}</div>
        <div>College: {professorDetails.college}</div>
        <div>Department: {professorDetails.department}</div>
      </div>
    );
  }
}

export default ViewReviews;
