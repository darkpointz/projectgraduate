import React, { useState } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  ThemeProvider,
} from "@material-ui/core";
import { createBrowserHistory } from "history";

import { Menu } from "@material-ui/icons";

import LoginByUserRoomName from "../Pages/loginByUserRoomName";
import LoginByUserName from "../Pages/loginByUserName";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: "100%",
//   },
//   appBar: {
//     backgroundColor: "#19A999",
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     fontFamily: "'Prompt', sans-serif",
//     fontWeight: 600,
//     fontSize: "34px",
//   },
//   btn: {
//     fontFamily: "'Prompt', sans-serif",
//     fontWeight: 500,
//     fontSize: "22px",
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "16px",
//     },
//   },
//   typotitle: {
//     fontFamily: "'Prompt', sans-serif",
//     fontWeight: 500,
//     fontSize: "32px",
//     padding: theme.spacing(3, 5),
//   },
//   content: {
//     padding: theme.spacing(12, 5),
//     [theme.breakpoints.down("sm")]: {
//       padding: theme.spacing(8, 2),
//     },
//   },
// }));

export default function NavbarStudent() {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });
  const [report, setreport] = useState();
  const [roomPublic, setroomPublic] = useState();

  const handleSetRoom = (roomUser, roomPublic) => {
    setreport(roomUser);
    setroomPublic(roomPublic);
  };

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
              <Button
                color="inherit"
                className={classes.btn}
                onClick={() => history.push("/login/teacher")}
              >
                Teacher Login
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container item xs={12} className={classes.content}>
          <Grid container item xs={12} justify="center" alignItems="center">
            <Typography className={classes.typotitle}>Student Login</Typography>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            {!report ? (
              <LoginByUserRoomName handleSetRoom={handleSetRoom} />
            ) : (
              <LoginByUserName reportId={report} roomPublic={roomPublic} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <Grid container>
    //     <Grid container item xs={12}>
    //       <AppBar position="sticky" className={classes.appBar}>
    //         <Toolbar>
    //           <Typography variant="h6" className={classes.title}>
    //             Qton
    //           </Typography>
    //           <Button
    //             color="inherit"
    //             className={classes.btn}
    //             onClick={() => history.push("/login/teacher")}
    //           >
    //             Teacher Login
    //           </Button>
    //         </Toolbar>
    //       </AppBar>
    //     </Grid>

    //     <Grid container item xs={12} className={classes.content}>
    //       <Grid container item xs={12} justify="center" alignItems="center">
    //         <Typography className={classes.typotitle}>Student Login</Typography>
    //       </Grid>
    //       <Grid container item xs={12} justify="center" alignItems="center">
    //         {!report ? (
    //           <LoginByUserRoomName handleSetRoom={handleSetRoom} />
    //         ) : (
    //           <LoginByUserName reportId={report} roomPublic={roomPublic} />
    //         )}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </div>
  );
}
