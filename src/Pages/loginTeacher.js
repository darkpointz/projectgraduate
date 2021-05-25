import React, { useState } from "react";
import { authService } from "../Auth/authService";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
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

export default function LoginTeacher() {
  const classes = useStyles();
  let history = useHistory();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleSumbit = (event) => {
    event.preventDefault();
    if (!email) {
      swal("error!", "Check your Email!", "error");
    }
    if (!password) {
      swal("error!", "Check your Password!", "error");
    }
    authService
      .signInWithEmail(email, password)
      .then((res) => {
        let uid = localStorage.getItem("userId");
        if (uid) {
          history.push("/launch");
        } else {
          swal("error!", "Check your Email or Password", "error");
        }
      })
      .catch((err) => {
        swal("error!", "Check your Email or Password", "error");
      });
  };

  const handleClicklogin = async () => {
    authService.signInWithGoogle().then((res) => {
      history.push("/launch");
    });
  };

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Grid container item xs={2}>
                <Typography variant="h6" className={classes.title}>
                  Qton
                </Typography>
              </Grid>
              <Grid container item xs={10} justify="flex-end">
                <Button
                  color="inherit"
                  className={classes.btn}
                  onClick={() => history.push("/login/student/0")}
                >
                  Student Login
                </Button>
              </Grid>
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
          <Grid
            className={classes.paper}
            container
            item
            xs={12}
            justify="center"
          >
            <Grid
              classesName={classes.gridTypo}
              item
              xs={12}
              container
              justify="center"
            >
              <Typography variant="h2" className={classes.typospace}>
                Teacher Login
              </Typography>
            </Grid>

            <Box display="flex" flexDirection="column">
              <TextField
                className={classes.textfieldStu}
                id="email"
                value={email}
                type="email"
                label="Email"
                variant="outlined"
                color="primary"
                inputProps={{ style: { fontSize: "20px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                className={classes.textfieldStu}
                id="password"
                value={password}
                type="password"
                label="Password"
                // helperText={errors.password}
                // error={errors.password ? true : false}
                variant="outlined"
                color="primary"
                inputProps={{ style: { fontSize: "20px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setpassword(e.target.value)}
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
                Login with Email
              </Button>
              <Typography variant="body2">Or Sign In Using</Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.googleButton}
                startIcon={
                  <Avatar
                    src="https://i.ibb.co/QD4Nn4R/google-logo.png"
                    className={classes.transparent}
                  />
                }
                onClick={handleClicklogin}
              >
                LogIn with Google
              </Button>
            </Grid>

            <Grid
              container
              item
              xs={12}
              justify="flex-end"
              direction="row"
              alignItems="center"
            >
              <Button onClick={() => history.push("/register")} mx="auto">
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

//--Old
// import React from "react";
// import { authService } from "../Auth/authService";
// import { auth } from "../Auth/firebase";
// import { createBrowserHistory } from "history";
// import { useStyles } from "./styles.js";
// import { useTheme } from "./theme.js";
// import {
//   ThemeProvider,
//   CssBaseline,
//   Button,
//   Toolbar,
//   Typography,
//   AppBar,
//   Grid,
// } from "@material-ui/core";

// export default function LoginTeacher() {
//   const classes = useStyles();
//   const history = createBrowserHistory({ forceRefresh: true });

//   const handleClicklogin = async () => {
//     authService.signInWithGoogle().then((res) => {
//       history.push("/launch");
//     });
//   };

//   const logout = async () => {
//     await auth
//       .signOut()
//       .then(() => {
//         console.log("logout_sucess");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return (
//     <ThemeProvider theme={useTheme}>
//       <CssBaseline />
//       <Grid container className={classes.root}>
//         <Grid container item xs={12} className={classes.GridAppBar}>
//           <AppBar position="sticky" elevation={0} className={classes.appBar}>
//             <Toolbar>
//               <Typography variant="h6" className={classes.title}>
//                 Qton
//               </Typography>
//               <Button
//                 color="inherit"
//                 className={classes.btn}
//                 onClick={() => history.push("/login/student")}
//               >
//                 Student Login
//               </Button>
//             </Toolbar>
//           </AppBar>
//         </Grid>
//         <Grid
//           container
//           item
//           xs={12}
//           className={classes.body}
//           alignItems="center"
//           justify="center"
//         >
//           <Grid
//             className={classes.paper}
//             container
//             item
//             xs={12}
//             justify="center"
//           >
//             <Grid
//               classesName={classes.gridTypo}
//               item
//               xs={12}
//               container
//               justify="center"
//             >
//               <Typography variant="h2">Teacher</Typography>
//             </Grid>

//             <Grid container item xs={12} justify="space-evenly">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleClicklogin}
//                 className={classes.button}
//               >
//                 LogIn with Google
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleClicklogin}
//                 className={classes.button}
//               >
//                 Login with Email
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }
