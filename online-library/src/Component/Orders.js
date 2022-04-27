import axios from "axios";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

function Orders({ username, token }) {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("Recent Orders");
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 5;
  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayItems = orders.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const changePage = (event, val) => {
    setPageNumber(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      //Hitting the url(query) with get method to get all the pending returns of the user
      await axios
        .get(`http://localhost:5000/search/orders?username=${username}`, {
          headers: {
            "x-access-token": token,
          }
        })
        .then((res) => {
          setOrders(res.data);
          console.log("Your orders retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [username,token]);

  // Button to view the recent and earlier orders
  const changeOrders = () => {
    setOrders(orders.reverse());
    if (name === "Recent Orders") {
      setName("Earlier Orders");
    } else {
      setName("Recent Orders");
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 50 }}></div>
      <Typography variant="h3" align="center">
        <ShoppingBasketRounded fontSize="large" />
        &nbsp; Orders
      </Typography>
      <div style={{ marginTop: 30 }}></div>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => changeOrders()}
      >
        {name}
      </Button>
      <div style={{ marginTop: 30 }}></div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "300px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {displayItems.length === 0 ? (
            <Typography variant="h5">
              You have made no Orders till now
            </Typography>
          ) : (
            displayItems.map((order, i) => {
              return (
                <Grid item key={i} xs={9} md={9} lg={9}>
                  <Card
                    key={i}
                    elevation={3}
                    style={{ border: "solid", borderColor: "blue" }}
                  >
                    <CardContent>
                      <Box display="flex" flexDirection="row">
                        <Box
                          sx={{
                            marginTop: "50px",
                            marginLeft: "75px",
                            marginBottom: "45px",
                          }}
                        >
                          <img
                            src={order.bookId.link}
                            style={{ width: 200, height: 300 }}
                            alt="bookImage"
                          />
                        </Box>
                        <Box
                          sx={{
                            marginTop: "45px",
                            marginLeft: "100px",
                            marginRight: "60px",
                          }}
                        >
                          &nbsp;
                          <Typography variant="h6" align="left">
                            Order Date - {order.date}
                          </Typography>
                          &nbsp;
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
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          marginLeft: "700px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={pageNumber}
          onChange={changePage}
        />
      </Box>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

// Mapping username from state to Component
const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.user.username,
    token: state.loginReducer.user.token,
  };
};

export default connect(mapStateToProps)(Orders);
