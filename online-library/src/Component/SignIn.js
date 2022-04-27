import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import store from "./store";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  Typography,
  Box,
} from "@material-ui/core";
import {
  AccountCircle,
  LockRounded,
} from "@material-ui/icons";

function SignIn() {
  const [username1, setUsername] = useState("");
  const [error1, setError1] = useState("");
  const [val1, setVal1] = useState(false);
  const [password1, setPassword] = useState("");
  const [error2, setError2] = useState("");
  const [val2, setVal2] = useState(false);
  const history = useNavigate();

  // Code to set and validate username
  const changeUsername = (val) => {
    setUsername(val);
    if (val.length === 0) {
      setError1("Username cannot be empty");
      setVal1(true);
    } else if (!val.match(/^[a-zA-Z0-9\s]+$/)) {
      setError1("Username should contain letters and numbers");
      setVal1(true);
    } else if (val.length < 5) {
      setError1("Username should contain minimum 5 characters");
      setVal1(true);
    } else if (val.length > 15) {
      setError1("Username should not exceed 15 characters");
      setVal1(true);
    } else if (val.match(/^[a-zA-Z0-9\s]{5,15}$/)) {
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
    } else if (val.match(/^.{6,20}$/)) {
      setError2("");
      setVal2(false);
    }
  };

  const LoginUser = () => {
    if (
      !username1.match(/^[a-zA-Z0-9\s]{5,15}$/) | !password1.match(/^.{6,20}$/)
    ) {
      setMessage("Invalid Username or Password");
      return;
    }
    // Hitting the url(query) with post method to login with given credentials
    const credentials = { username: username1, password: password1 };
    axios
      .post(`http://localhost:5000/login`, credentials)
      .then((res) => {
        if (res.data) {
          const user = {
            userId: res.data.user._id,
            username: res.data.user.username,
            isAdmin: res.data.user.isAdmin,
            token: res.data.token,
          };
          store.dispatch({ type: "loginSuccess", payload: user });
          console.log("Login Success");
          // Redirecting to home page
          history("/home");
        } else {
          store.dispatch({ type: "loginFail" });
          console.log("Invalid Username or Password");
          setMessage("Username or Password is Invalid");
        }
      })
      .catch((err) => {
        store.dispatch({ type: "loginFail" });
        setMessage(err);
        console.log(err);
      });
  };

  return (
    <div>
      <Grid
        container
        minwidth="100vh"
        style={{ border: "solid", minwidth: "100%", height: "100vh" }}
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
          <Typography variant="h2"> Login To Your Account </Typography>
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
              inputProps={{ pattern: /^[a-zA-Z0-9]{5,15}$/ }}
              margin="normal"
              onClick={(e) => changeUsername(e.target.value)}
              onChange={(e) => changeUsername(e.target.value)}
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
              inputProps={{ pattern: /^.{6,20}$/ }}
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
            <Typography variant="h5" htmlFor="rememberMe">
              remember me
              <Checkbox
                type="checkbox"
                defaultChecked
                color="primary"
                value="lsRememberMe"
              ></Checkbox>
            </Typography>
            <div style={{ marginTop: "20px" }} />

            <Button
              type="submit"
              onClick={LoginUser}
              color="primary"
              size="large"
              variant="contained"
            >
              Sign In
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
            color: "white",
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
            <Typography variant="h2"> New Here?</Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography variant="h6">
              Sign Up and discover different kinds of New Books!
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "yellow" }}
            >
              <Button variant="contained" color="default" size="large">
                Sign Up
              </Button>
            </Link>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
