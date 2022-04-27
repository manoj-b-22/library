import store from "./store";
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

function Product(props) {
  const book = props.book;

  // Code to add a book to the cart
  const addToCart = (item) => {
    store.dispatch({ type: "ADD_TO_CART", payload: { item: item } });
    console.log("book id :" + item._id + " is added to cart");
  };

  return (
    <div>
      <Card
        elevation={4}
        style={{ border: "solid", borderColor: "blue", borderWidth: "2px" }}
      >
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{
                marginTop: "30px",
                marginLeft: "60px",
                marginBottom: "30px",
              }}
            >
              <img
                src={book.link}
                style={{ width: 150, height: 250 }}
                alt="bookImage"
              />
            </Box>
            <Box
              sx={{
                marginTop: "30px",
                marginLeft: "100px",
                marginRight: "30px",
                marginBottom: "30px",
              }}
            >
              <Typography variant="h6" align="left">
                Title - {book.title}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Author - {book.author}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                ISBN - {book.ISBN}
              </Typography>
              &nbsp;
              <Typography variant="h6" align="left">
                Publication - {book.publication}
              </Typography>
              <Box sx={{ marginTop: "30px", marginRight: "100px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => addToCart(book)}
                  startIcon={<AddOutlined fontSize="large" />}
                >
                  Add To Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Product;
