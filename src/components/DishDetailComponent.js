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
    const dish = this.props.dish;
    if (dish != null) {
      const comments = dish.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              --{comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        );
      });
      return (
        <>
          <div className="container">
            <div className="row">
              <Card className="col-12 col-md-5 m-1">
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
              <div className="col-12 col-md-5 m-1">
                <h3 className="my-3">Comments</h3>
                {comments}
              </div>
            </div>
          </div>
        </>
      );
    } else return <div></div>;
  }
}

export default DishDetailComponent;
