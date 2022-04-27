import store from "./store";
import { actionTypes } from "./reducers/CartReducer";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

const CartProduct = ({ item }) => {
  // Code to delete an item from cart
  const deleteFromCart = () => {
    const action = {
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        item: item,
      },
    };
    // Deleting an item from cart in state
    store.dispatch(action);
    console.log("deleted a book in cart");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "250px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={10} md={10} lg={10}>
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={deleteFromCart} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + item._id}
              />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box
                    sx={{
                      marginLeft: "75px",
                      marginBottom: "50px",
                    }}
                  >
                    <img
                      src={item.link}
                      style={{ width: 200, height: 300 }}
                      alt="bookImage"
                    />
                  </Box>
                  <Box
                    sx={{
                      marginTop: "30px",
                      marginLeft: "100px",
                      marginRight: "60px",
                    }}
                  >
                    <Typography variant="h6" align="left">
                      Book Title - {item.title}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book ISBN - {item.ISBN}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book Publication - {item.publication}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Book Author - {item.author}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartProduct;
