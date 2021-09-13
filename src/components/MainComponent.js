import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // addComment: (dishId, rating, author, comment) =>
  // dispatch(addComment(dishId, rating, author, comment)),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchLeaders: () => dispatch(fetchLeaders()),
});
class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS,
    //   // selectedDish: null,
    // };
  }
  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId });
  // }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }
  render() {
    const HomePage = () => {
      console.log(this.props.leaders.leaders, "kaise");
      console.log(this.props.dishes.dishes, "kaise");
      console.log(this.props.promotions.promotions, "kaise");
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
        />
      );
    };
    const DishWithId = ({ match }) => {
      console.log(
        "hellllo listen",
        this.props.dishes.dishes,
        this.props.promotions.promotions
      );
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          // addComment={this.props.addComment}
          postComment={this.props.postComment}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          {/* <Route exact path="/contactus" component={Contact} /> */}
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        {/* <Menu
          dishes={this.props.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetailComponent
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === this.props.selectedDish
            )[0]
          }
        /> */}
        <Footer />
      </div>
    );
  }
}

// export default withRouter(connect(mapStatetoProps(Main)));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
