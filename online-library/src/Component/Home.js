import axios from "axios";
import React from "react"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Product from "./Product";
import NavBar from "./NavBar";
import CartCounter from "./CartCounter";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import Paginate from "./Paginate";

function Home({ token }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [attribute, setAttribute] = useState("title");
  const [sortBy, setSortBy] = useState("_id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      //Hitting the url with get method to get books from db
      await axios
        .get(`http://localhost:5000/books`)
        .then((res) => {
          setBooks(res.data);
          console.log("books data retrieved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const searchData = async () => {
    //Hitting the url(along with query) with get method
    await axios
      .get(`http://localhost:5000/search/books?${attribute}=${search}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setBooks(res.data);
        console.log("search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 50 }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "300px",
              marginBottom: "40px",
            }}
          >
            <label htmlFor="search"> </label>
            <Box
              sx={{
                minWidth: 100,
                marginRight: "75px",
              }}
            >
              <FormControl fullWidth size="small">
                <Select
                  id="search"
                  variant="outlined"
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="publication">Publication</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginRight: "30px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="text"
                label="search anything..."
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
            </Box>
            <Box
              sx={{
                marginRight: "300px",
              }}
            >
              <Button
                size="medium"
                variant="contained"
                type="submit"
                onClick={searchData}
                color="primary"
                startIcon={<SearchRounded />}
              >
                Search
              </Button>
            </Box>
            <CartCounter />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "500px",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h6">Sort By:</Typography>
            <Box
              sx={{
                minWidth: 100,
                marginLeft: "10px",
                marginRight: "75px",
              }}
            >
              <FormControl fullWidth size="small">
                <Select
                  id="sort"
                  variant="outlined"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="_id">_id</MenuItem>
                  <MenuItem value="title">title</MenuItem>
                  <MenuItem value="author">author</MenuItem>
                  <MenuItem value="publication">publication</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="h6">Order:</Typography>
            <Box
              sx={{
                minWidth: 100,
                marginLeft: "10px",
              }}
            >
              <FormControl fullWidth size="small">
                <Select
                  id="order"
                  variant="outlined"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <MenuItem value="asc">ascending</MenuItem>
                  <MenuItem value="desc">descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Paginate
          items={books.sort((a, b) => {
            //Code to sort in all possible ways
            const ord = order === "asc" ? 1 : -1;
            if (a[sortBy] > b[sortBy]) {
              return 1 * ord;
            } else if (a[sortBy] < b[sortBy]) {
              return -1 * ord;
            }
            return 0;
          })}
          Component={Product}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.user.token,
  };
};

export default connect(mapStateToProps)(Home);
