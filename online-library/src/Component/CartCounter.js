import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoppingCartIconRounded from "@material-ui/icons/ShoppingCart";

function CartCounter({ cart }) {
  const [cartCount, setCartCount] = useState(0);

  //Code to calculate cart count
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  return (
    <div>
      <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "black",
            WebkitBorderRadius: "50%",
            textAlign: "center",
            float: "right",
          }}
        >
          <ShoppingCartIconRounded
            fontSize="medium"
            style={{ marginTop: "10px" }}
          />
          <span className="cart-items" style={{ color: "white" }}>
            {cartCount}
          </span>
        </div>
      </Link>
    </div>
  );
}

// Mapping  cart from state to component
const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

export default connect(mapStateToProps)(CartCounter);
