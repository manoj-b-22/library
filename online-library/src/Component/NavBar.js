import store from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MenuBookRounded } from "@material-ui/icons";

function NavBar({ user }) {
  // Code for logout
  const logOut = () => {
    store.dispatch({ type: "logOut" });
    console.log("Successfully logged out");
  };

  // special features only for admin
  let manage = <></>;
  let update = <></>;
  if (user.isAdmin) {
    manage = (
      <Link
        to="/manage"
        style={{ fontSize: "1.17em", textDecoration: "none", color: "white" }}
      >
        Manage Orders
      </Link>
    );
    update = (
      <Link
        to="/books"
        style={{ fontSize: "1.17em", textDecoration: "none", color: "white" }}
      >
        Manage Books
      </Link>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "7%",
            }}
          >
            <IconButton>
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <MenuBookRounded fontSize="large" />
              </Link>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
            <Typography variant="h4">e-Library</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15%",
            }}
          >
            {update}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "15%",
            }}
          >
            {manage}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "8%",
            }}
          >
            <Link
              to="/status"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Status
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "12%",
            }}
          >
            <Link
              to="/orders"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Your Orders
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
              padding: "5px 0px",
            }}
          >
            <Link
              to="/profile"
              style={{
                fontSize: "1.17em",
                textDecoration: "none",
                color: "white",
              }}
            >
              Hi {user.username}
            </Link>
          </Box>
          <Box>
            <Button variant="contained">
              <Link
                to="/"
                onClick={logOut}
                style={{ textDecoration: "none", color: "black" }}
              >
                LogOut
              </Link>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Mapping username from state to Component
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(NavBar);
