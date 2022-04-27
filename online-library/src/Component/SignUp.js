import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  Typography,
  Box,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

function SignUp() {
  const [username1, setUsername] = useState("");
  const [error1, setError1] = useState("");
  const [val1, setVal1] = useState(false);
  const [password1, setPassword] = useState("");
  const [error2, setError2] = useState("");
  const [val2, setVal2] = useState(false);
  const [isAdmin1, setisAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const history = useNavigate();

  // Code to set and validate username
  const changeUsername = (val) => {
    setUsername(val);
    if (val.length === 0) {
      setError1("Username cannot be empty");
      setVal1(true);
    } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
      setError1("Username should contain letters and numbers");
      setVal1(true);
    } else if (val.length < 5) {
      setError1("Username should contain minimum 5 characters");
      setVal1(true);
    } else if (val.length > 15) {
      setError1("Username should not exceed 15 characters");
      setVal1(true);
    } else if (val.match(/^[a-zA-Z0-9]{5,15}$/)) {
      setError1("");
      setVal1(false);
    }
  };

  // Code to set and validate password
  const changePassword = (val) => {
    setPassword(val);
    if (val.length === 0) {
      setError2("Password cannot be empty");
      setVal2(true);
    } else if (val.length < 6) {
      setError2("Password should contain minimum 6 characters");
      setVal2(true);
    } else if (val.length > 20) {
      setError2("Password should not exceed 20 characters");
      setVal2(true);
    } else if (val.match(/^.{6,20}$/)) {
      setError2("");
      setVal2(false);
    }
  };

  const SignUpUser = () => {
    const user = {
      username: username1,
      password: password1,
      isAdmin: isAdmin1,
    };
    if ((username1.length > 0) & (password1.length > 0)) {
      // Hitting the url with post method to add a new user
      axios
        .post(`http://localhost:5000/users`, user)
        .then((res) => {
          console.log("user created successfully");
          history("/");
        })
        .catch((err) => {
          setMessage(err);
          console.log(err);
        });
    } else {
      if (username1.length === 0) {
        console.log("username should not be empty");
        setMessage("Username should not be empty");
      }
      if (password1.length === 0) {
        console.log("password should not be empty");
        setMessage("Password should not be empty");
      }
    }
  };

  return (
    <div>
      <Grid
        container
        minwidth="100vh"
        style={{
          border: "solid",
          minwidth: "100%",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={8} lg={8}>
          <Box
            sx={{
              marginRight: "850px",
            }}
          >
            <Typography variant="h6">Online Library</Typography>
          </Box>
          <div style={{ marginTop: "145px" }} />
          <Typography variant="h2"> SignUp To Your Account </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "250px",
              marginRight: "250px",
              marginTop: "20px",
            }}
          >
            <TextField
              variant="outlined"
              type="text"
              label="Username"
              margin="normal"
              onClick={(e) => changeUsername(e.target.value)}
              onChange={(e) => changeUsername(e.target.value)}
              InputLabelProps={{}}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              helperText={error1}
              error={val1}
            ></TextField>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              margin="normal"
              onClick={(e) => changePassword(e.target.value)}
              onChange={(e) => changePassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
              helperText={error2}
              error={val2}
            ></TextField>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h6">
              Admin
              <Checkbox
                name="isAdmin"
                type="checkbox"
                checked={isAdmin1}
                color="primary"
                onChange={(e) => setisAdmin(!isAdmin1)}
              ></Checkbox>
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography>{message}</Typography>
            <Button
              type="submit"
              onClick={SignUpUser}
              color="primary"
              variant="contained"
            >
              SignUp
            </Button>
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={4}
          lg={4}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          style={{
            padding: 10,
            backgroundImage: `url('https://i.pinimg.com/736x/87/8c/7d/878c7d859694d9fabf7669e003bdead3.jpg')`,
          }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minwidth: 300,
            }}
          >
            <Typography variant="h2" style={{ color: "white" }}>
              {" "}
              Already Here?
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h6" style={{ color: "white" }}>
              Sign In and jump into your own Online Personal Library!
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Link to="/" style={{ textDecoration: "none", color: "yellow" }}>
              <Button variant="contained" color="default" size="large">
                Sign In
              </Button>
            </Link>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
