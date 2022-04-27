import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { AssessmentRounded, LibraryBooksRounded } from "@material-ui/icons";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

const Status = ({ username, token }) => {
  const [orders, setOrders] = useState([]);
  const [fines, setFines] = useState([]);
  const [colors, setColors] = useState([]);
  const [dueDates, setDueDates] = useState([]);
  const [totalFine, setTotalFine] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Hitting the url(query) with get method to get all the pending book returns of the user
      await axios
        .get(
          `http://localhost:5000/search/orders?username=${username}&return=false`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then((res) => {
          setOrders(res.data);
          console.log("Your pending returns retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [username,token]);

  // Code to Calculate the due date for each order
  useEffect(() => {
    let due = [];
    orders.forEach((order) => {
      const date = new Date(order.date).getTime();
      let dueD = date + 604800000;
      dueD = new Date(dueD).toUTCString();
      due.push(dueD);
    });
    setDueDates(due);
  }, [orders]);

  //Code to calculate the fine and setting the status color
  useEffect(() => {
    let fine = [];
    let color = [];
    let total = 0;
    orders.forEach((order) => {
      const date = new Date(order.date).getDate();
      const currentDate = new Date().getDate();
      if (currentDate - date > 7) {
        const f = (currentDate - 7 - date) * 10;
        fine.push(f);
        total += f;
      } else {
        fine.push(0);
      }

      if (currentDate - date === 7) {
        color.push("yellow");
      } else if (currentDate - date < 7) {
        color.push("green");
      } else {
        color.push("red");
      }
    });
    setFines(fine);
    setColors(color);
    setTotalFine(total);
  }, [orders]);

  // Code to return the book
  const returnBooks = (item) => {
    const order = {
      date: item.date,
      username: username,
      return: true,
      bookId: item.bookId,
    };
    // Hitting the url with put method to update the return status of the order
    axios
      .patch(`http://localhost:5000/orders/${item._id}`, order)
      .then((res) => {
        setOrders(orders.filter((i) => i._id !== item._id));
        console.log("Book " + item.bookId._id + " returned successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "10%",
          marginLeft: "675px",
        }}
      >
        <AssessmentRounded fontSize="large" />
        <Typography variant="h4">Status</Typography>
      </Box>
      <div style={{ marginTop: 40 }}></div>
      <Typography variant="h4" align="center">
        Total Fine - {totalFine} Rs
      </Typography>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "250px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {orders.length === 0 ? (
            <Typography variant="h5">
              You have no Pending Book Returns
            </Typography>
          ) : (
            orders.map((order, i) => (
              <Grid item key={i} xs={9} md={9} lg={9}>
                <Card
                  key={i}
                  elevation={3}
                  style={{ border: "solid", borderColor: colors[i] }}
                >
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Box
                        sx={{
                          marginTop: "50px",
                          marginLeft: "100px",
                        }}
                      >
                        <img
                          src={order.bookId.link}
                          style={{ width: 250, height: 350 }}
                          alt="bookImage"
                        />
                      </Box>
                      <Box
                        sx={{
                          marginTop: "60px",
                          marginLeft: "100px",
                          marginRight: "60px",
                          marginBottom: "45px",
                        }}
                      >
                        <Typography variant="h6" align="left">
                          Book Title - {order.bookId.title}
                        </Typography>
                        &nbsp;
                        <Typography variant="h6" align="left">
                          Book ISBN - {order.bookId.ISBN}
                        </Typography>
                        &nbsp;
                        <Typography variant="h6" align="left">
                          Book Publication - {order.bookId.publication}
                        </Typography>
                        &nbsp;
                        <Typography variant="h6" align="left">
                          Book Author - {order.bookId.author}
                        </Typography>
                        &nbsp;
                        <Typography variant="h6" align="left">
                          Due Date: {dueDates[i]}
                        </Typography>
                        &nbsp;
                        <Typography variant="h6" align="left">
                          Fine: {fines[i]} Rupees
                        </Typography>
                        &nbsp;
                        <Typography align="right">
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => returnBooks(order)}
                            endIcon={<LibraryBooksRounded fontSize="large" />}
                          >
                            Return Book
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <div style={{ marginTop: 40 }}></div>
    </div>
  );
};

// Mapping username from state to Component
const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
    token: state.loginReducer.user.token,
  };
};

export default connect(mapStateToProps)(Status);
