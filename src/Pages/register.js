import React, { useState } from "react";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
import { useHistory } from "react-router-dom";
import { userService } from "../Services/userService";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
  AppBar,
  Grid,
  Box,
  TextField,
  Avatar,
} from "@material-ui/core";
import swal from "sweetalert";

export default function Register() {
  const classes = useStyles();
  let history = useHistory();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [fname, setfname] = useState();
  const [lname, setlname] = useState();

  const handleSumbit = (event) => {
    event.preventDefault();
    if (!email) {
      swal("error!", "Check your email!", "error");
    }
    if (!fname) {
      swal("error!", "Check your FirstName!", "error");
    }
    if (!lname) {
      swal("error!", "Check your LastName!", "error");
    }
    if (password !== confirmPassword || !password || !confirmPassword) {
      swal("error!", "Check your password!", "error");
    } else if (password.length < 6) {
      swal("error!", "Password should be at least 6 characters!", "error");
    } else if (password === confirmPassword) {
      let formRegister = {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
      };
      console.log("formRegister ", formRegister);
      userService
        .register(formRegister)
        .then((res) => {
          swal("Success!", "Register Success!", "success");
          history.push("/login/teacher");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container item xs={12} className={classes.GridAppBar}>
        <AppBar position="sticky" elevation={0} className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Qton
            </Typography>
            <Button
              color="inherit"
              className={classes.btn}
              onClick={() => history.push("/")}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid
        container
        item
        xs={12}
        className={classes.body}
        alignItems="center"
        justify="center"
      >
        <Grid container item xs={12} className={classes.paper} justify="center">
          <Grid
            classesName={classes.gridTypo}
            item
            xs={12}
            container
            justify="center"
          >
            <Typography variant="h2" className={classes.typospace}>
              Register
            </Typography>
          </Grid>
          <Box display="flex" flexDirection="column">
            <TextField
              className={classes.textfieldStu}
              id="email"
              variant="outlined"
              label="email"
              value={email}
              color="primary"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "20px" } }}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              className={classes.textfieldStu}
              id="password"
              type="password"
              value={password}
              label="Password"
              variant="outlined"
              color="primary"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "20px" } }}
              onChange={(e) => setpassword(e.target.value)}
            />
            <TextField
              className={classes.textfieldStu}
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              variant="outlined"
              color="primary"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "20px" } }}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <TextField
              className={classes.textfieldStu}
              id="fname"
              type="firstname"
              label="Firstname"
              value={fname}
              variant="outlined"
              color="primary"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "20px" } }}
              onChange={(e) => setfname(e.target.value)}
            />
            <TextField
              className={classes.textfieldStu}
              id="lname"
              type="lastname"
              label="Lastname"
              value={lname}
              variant="outlined"
              color="primary"
              inputProps={{ style: { fontSize: "20px" } }}
              InputLabelProps={{ style: { fontSize: "20px" } }}
              onChange={(e) => setlname(e.target.value)}
            />
          </Box>
          <Grid
            container
            item
            xs={12}
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Button
              type="sumbit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSumbit(e)}
              className={classes.button}
            >
              Sumbit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
