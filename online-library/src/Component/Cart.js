import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import CartProduct from "./CartProduct";
import { actionTypes } from "./reducers/CartReducer";
import NavBar from "./NavBar";
import { ShoppingCartRounded } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";

function Cart({ cart, user }) {
  const history = useNavigate();

  // Code to checkout from cart
  // Date is class which returns the current date in milliseconds. toUTCString() returns the readable string format of the date and time(GMT)
  const placeOrder = () => {
    cart.forEach((item) => {
      let order = {
        date: new Date().toUTCString(),
        username: user,
        bookId: item._id,
        return: false,
      };
      //Hitting the url with  post method to add an order in json
      axios
        .post(`http://localhost:5000/orders`, order)
        .then((res) => {
          console.log("book " + item._id + " added to orders table");
          setTimeout(() => {
            // Resetting the cart after checkout
            store.dispatch({ type: actionTypes.RESET_CART });
            console.log("Cart Reset");
            history("/orders");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingCartRounded fontSize="large" />
        &nbsp; Cart
      </Typography>
      &nbsp;
      {cart.length === 0 ? (
        <Typography variant="h5">Cart is empty</Typography>
      ) : (
        cart.map((item, id) => {
          return <CartProduct item={item} key={id} />;
        })
      )}
      <div style={{ marginTop: 30 }}></div>
      <Button color="secondary" variant="contained" onClick={placeOrder}>
        Check Out
      </Button>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

// Mapping username, cart from state to Component
const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    user: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Cart);
