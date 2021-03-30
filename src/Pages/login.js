import React, { useState, useContext } from "react";
import axios from "axios";
import { authService } from "../Auth/authService";
import { auth, provider } from "../Auth/firebase";
import { createBrowserHistory } from "history";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
import {
  CssBaseline,
  Button,
  Typography,
  ThemeProvider,
  Grid,
  AppBar,
  Toolbar,
} from "@material-ui/core";

export default function Login() {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Qton
              </Typography>
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
              <Typography variant="h2">LOGIN</Typography>
              {/* classesName={classes.typoLogin} */}
            </Grid>

            <Grid container item xs={12} justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/teacher")}
                className={classes.button}
              >
                Login Teacher
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/student/room")}
                className={classes.button}
              >
                Login Student
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

//------เก่า
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { authService } from "../Auth/authService";
// import { auth, provider } from "../Auth/firebase";
// import { createBrowserHistory } from "history";
// import {
//   makeStyles,
//   IconButton,
//   Button,
//   FormControl,
//   Typography,
//   Box,
//   Grid,
// } from "@material-ui/core";
// // import { UserContext } from "../Contexts/user";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexGrow: 1,
//     m: 0,
//     p: 0,
//     // padding: "0",
//     // margin: "0",
//     // background: 'linear-gradient(45deg, #138086, #534666)'
//   },
//   body: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     alignItems: "center",
//     flexGrow: 1,
//     background: "linear-gradient(45deg, #138086, #534666)",
//     height: "100%",
//     width: "100%",
//     position: "absolute",
//   },
//   paper: {
//     display: "flex",
//     overflow: "hidden",
//     alignItems: "center",
//     flexDirection: "column",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     flexGrow: 1,
//     width: "500px",
//     position: "absolute",
//   },
//   textfield: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",
//     justifyContent: "center",
//     marginTop: 24,
//     [theme.breakpoints.down("sm")]: {
//       margin: "10px 10px",
//     },
//   },
//   l: {
//     fontFamily: "'Poppins', sans-serif",
//     fontSize: 39,
//     fontWeight: 400,
//     marginTop: 24,
//   },
//   button: {
//     marginTop: 24,
//     marginBottom: 15,
//   },
// }));

// export default function Login() {
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
//     <div>
//       <Button variant="contained" onClick={handleClicklogin}>
//         Google Signin Teacher
//       </Button>
//       <Button
//         variant="contained"
//         style={{ marginLeft: "20px" }}
//         onClick={() => history.push("/login/student/room")}
//       >
//         Login Student
//       </Button>
//     </div>
//   );
// }
