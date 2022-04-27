import axios from "axios";
import store from "./store";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./css/Card.css";
import { Button, TextField, Box } from "@material-ui/core";

const Profile = ({ user }) => {
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [books, setBooks] = useState(0);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [val, setVal] = useState(false);
  const [message, setMessage] = useState("");

  // Variable to check whether a user is student or admin
  const type = user.isAdmin ? "Admin" : "Student";
  // Variable to show books added by admin
  const added = user.isAdmin ? (
    <tr>
      <td>Books Added</td>
      <td className="p">{books}</td>
    </tr>
  ) : (
    <></>
  );

  useEffect(() => {
    const fetchData = async () => {
      // Hitting the url with get method to get all the orders of the user
      await axios
        .get(`http://localhost:5000/search/orders?username=${user.username}`, {
          headers: {
            "x-access-token": user.token,
          },
        })
        .then((res) => {
          setOrders(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username,user.token]);

  useEffect(() => {
    const fetchData = async () => {
      // Hitting the url with get method to get all the pending book returns of the user
      await axios
        .get(
          `http://localhost:5000/search/orders?username=${user.username}&return=false`,
          {
            headers: {
              "x-access-token": user.token,
            },
          }
        )
        .then((res) => {
          setPending(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username,user.token]);

  useEffect(() => {
    const fetchData = async () => {
      // Hitting the url with get method to get all the books added by the admin
      await axios
        .get(`http://localhost:5000/search/books?addedBy=${user.username}`, {
          headers: {
            "x-access-token": user.token,
          },
        })
        .then((res) => {
          setBooks(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.username,user.token]);

  // Function is called when user clicks on change password
  const expand = () => {
    let x = document.getElementById("change");
    let y = document.getElementsByClassName("Cards")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.height = "800px";
    } else {
      x.style.display = "none";
      y.style.height = "600px";
    }
  };

  // Code to set and validate the password
  const checkPassword = (val) => {
    setPassword(val);
    if (val.length === 0) {
      setError("Password cannot be empty");
      setVal(true);
    } else if (val.length < 6) {
      setError("Password should contain minimum 6 characters");
      setVal(true);
    } else if (val.length > 20) {
      setError("Password should not exceed 20 characters");
      setVal(true);
    } else if (val.match(/^.{6,20}$/)) {
      setError("");
      setVal(false);
    }
  };

  // Code to validate whether confirm password is same as password
  const changeConfirm = (val) => {
    setConfirm(val);
    if (val !== password) {
      setMessage("confirm password should be same as password");
    } else {
      setMessage("");
    }
  };


  // Code to change password
  const changePassword = () => {
    if ((password !== "") & (password === confirm)) {
      const update = {
        username: user.username,
        password: password,
        isAdmin: user.isAdmin,
      };
      // Hitting the url with patch method to change password of the user
      axios
        .patch(`http://localhost:5000/users/${user.userId}`, update)
        .then((res) => {
          console.log("changed password successfully");
          // Redirecting the user to signin page
          store.dispatch({ type: "logOut" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <br />
      <Box
        sx={{
          marginLeft: "15%",
        }}
      >
        <div className="Cards">
          <div className="upper-container">
            <div className="image-container">
              <img
                className="q"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw40RqD54BYg7g04mBOm0f2k24h2hhn8-gg&usqp=CAU"
                alt=""
                height="100px"
                width="100px"
              />
            </div>
          </div>
          <div className="lower-container">
            <br />
            <h2 className="pen">PROFILE</h2>
            <table>
              <tbody>
              <tr>
                <td>Username</td>
                <td className="p">{user.username.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td className="p">{type}</td>
              </tr>
              <tr>
                <td>Total Orders</td>
                <td className="p">{orders}</td>
              </tr>
              <tr>
                <td>Pending Orders </td>
                <td className="p">{pending}</td>
              </tr>
              {added}

              </tbody>
            
            </table>
            <br />
            <Button
              color="primary"
              style={{ marginLeft: "14%" }}
              onClick={() => expand()}
            >
              Change Password
            </Button>
            <div style={{ marginTop: 20 }}></div>
            <div id="change" style={{ display: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "350px",
                  marginRight: "230px",
                }}
              >
                <TextField
                  variant="outlined"
                  type="text"
                  label="New password"
                  onChange={(e) => checkPassword(e.target.value)}
                  required
                  helperText={error}
                  error={val}
                ></TextField>
                &nbsp;
                <TextField
                  variant="outlined"
                  type="text"
                  label="Confirm new password"
                  onChange={(e) => changeConfirm(e.target.value)}
                  required
                ></TextField>
                {message}
                &nbsp;
                <Link
                  to="/"
                  onClick={() => changePassword()}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button color="primary" variant="contained">
                    Confirm
                  </Button>
                </Link>
              </Box>
              <div style={{ marginTop: 30 }}></div>
            </div>
          </div>
        </div>
      </Box>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
};

// Mapping the user object from state to Component
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);
