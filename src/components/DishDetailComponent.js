import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

export class DishDetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dish = this.props.renderDish;
    if (dish != null) {
      const comments = dish.comments.map((comment) => {
        const d = new Date(comment.date);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              --{comment.author}, {months[d.getMonth()].substring(0, 3)}{" "}
              {d.getDate()}, {d.getFullYear()}
            </p>
          </div>
        );
      });
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg top src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-5 m-1">
            <h3 className="my-3">Comments</h3>
            {comments}
          </div>
        </div>
      );
    } else return <div></div>;
  }
}

export default DishDetailComponent;
