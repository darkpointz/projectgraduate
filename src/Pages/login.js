import React from "react";
import { createBrowserHistory } from "history";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
import { useHistory } from "react-router-dom";
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
  // const history = createBrowserHistory({ forceRefresh: true });
  let history = useHistory();

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Grid container item xs={6} >

                <Typography variant="h6" className={classes.title}>
                  Qton
              </Typography>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Button
                  color="inherit"
                  className={classes.btn}
                  onClick={() => history.push("/register")}
                >
                  Register
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
              <Typography variant="h2">LOGIN</Typography>
              {/* classesName={classes.typoLogin} */}
            </Grid>

            <Grid
              container
              item
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/teacher")}
                className={classes.buttonTea}
              >
                Login Teacher
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/student/room/0")}
                className={classes.buttonStu}
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

//--old
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { authService } from "../Auth/authService";
// import { auth, provider } from "../Auth/firebase";
// import { createBrowserHistory } from "history";
// import {
//   makeStyles,
//   CssBaseline,
//   Button,
//   createMuiTheme,
//   Typography,
//   ThemeProvider,
//   Grid,
// } from "@material-ui/core";
// // import { UserContext } from "../Contexts/user";

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: "'Prompt', sans-serif",
//     h2: {
//       fontSize: "32px",
//       fontWeight: 600,
//     },
//   },
//   palette: {
//     primary: {
//       main: "#138086",
//     },
//     secondary: {
//       main: "#534666",
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // padding: "0",
//     // margin: "0",
//     // background: 'linear-gradient(45deg, #138086, #534666)'
//   },
//   body: {
//     background: "linear-gradient(45deg, #138086, #534666)",
//     height: "100%",
//     width: "100%",
//     position: "absolute",
//   },
//   paper: {
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     borderRadius: 10,
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
//   typoLogin: {
//     fontFamily: "'Prompt', sans-serif",
//     fontSize: "32px",
//     fontWeight: 600,
//   },
//   button: {
//     margin: "10px 0",
//   },
//   gridTypo: {
//     marginTop: 24,
//   },
// }));

// export default function Login() {
//   const classes = useStyles();
//   const history = createBrowserHistory({ forceRefresh: true });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Grid container className={classes.root}>
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
//               <Typography variant="h2">LOGIN</Typography>
//               {/* classesName={classes.typoLogin} */}
//             </Grid>

//             <Grid container item xs={12} justify="space-evenly">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => history.push("/login/teacher")}
//                 className={classes.button}
//               >
//                 Login Teacher
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => history.push("/login/student/room")}
//                 className={classes.button}
//               >
//                 Login Student
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }
