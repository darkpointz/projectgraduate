import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ListItemAvatar,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Grid,
  InputLabel,
  Button,
} from "@material-ui/core";
import { Menu, ExitToApp, ArrowDropDown } from "@material-ui/icons";
import { formatMs, makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter, Route, Switch } from "react-router-dom";
import swal from "sweetalert";

import Lanunch from "../Pages/lanunch";
import Report from "../Pages/reports";
import Quiz from "../Pages/quiz";
import Class from "../Pages/class";
import ClassStudent from "../Components/classStudent";
import { authService } from "../Auth/authService";
import Result from "../Pages/result";
import Createquiz from "../Components/createquiz";
import LiveResult from "../Pages/liveResult";
import ShowReportByReportId from "../Components/showReportByReportId";
import { classService } from "../Services/classService";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#19A999",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  selectRoom: {
    width: "30%",
    textAlign: "center",
  },
  menuItem: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
    color: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    maxWidth: "1400px",
    padding: theme.spacing(12, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(10, 2),
    },
  },
  typoLogo: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "34px",
  },
}));

function Navbar(props) {
  const { history } = props;
  const { window } = props;
  const { displayPic } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [room, setroom] = useState([]);
  const [selectRoom, setselectRoom] = useState("");
  const [roomName, setroomName] = useState("");

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    classService.getAllRoom(uId).then((res) => {
      setroom(res);
      const selectRoom = localStorage.getItem("Room");
      const RoomName = localStorage.getItem("RoomName");
      console.log(RoomName);
      setselectRoom(selectRoom);
      setroomName(RoomName);
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    swal({
      title: "Please Confirm",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Sign out success!", {
          icon: "success",
        });
        authService.logout();
        history.push("/");
      }
    });
  };

  const itemsList = [
    {
      text: "Launch",
      onClick: () => history.push("/launch"),
    },
    {
      text: "Quiz",
      onClick: () => history.push("/quiz"),
    },
    {
      text: "Class",
      onClick: () => history.push("/room"),
    },
    {
      text: "Report",
      onClick: () => history.push("/report"),
    },
  ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <ListItem alignItems="center">
        {displayPic ? (
          <ListItemAvatar>
            <Avatar alt="displayPic" src={displayPic} />
          </ListItemAvatar>
        ) : null}
        <ListItemText primary={props.displayName} />
      </ListItem>
      <Divider />
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {/* {icon && <ListItemIcon>{icon}</ListItemIcon>} */}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
        <ListItem button key={"result"} onClick={() => history.push("/result")}>
          {/* {icon && <ListItemIcon>{icon}</ListItemIcon>} */}
          <ListItemText primary={"Result"} />
        </ListItem>
        <Divider />
        <ListItem button key={"logout"} onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );

  const handleChangeRoom = (event) => {
    console.log(event.target.value);
    localStorage.setItem("RoomName", event.target.value);
    setroomName(event.target.value);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid xs={4} container>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <Typography className={classes.typoLogo} noWrap>
              Qton
            </Typography>
          </Grid>
          <Grid xs={8} container>
            <FormControl className={classes.selectRoom}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roomName}
                onChange={handleChangeRoom}
                className={classes.menuItem}
              >
                {room?.map((room, i) => {
                  return (
                    <MenuItem key={i} value={room.roomName}>
                      {room.roomName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact
            from="/launch"
            render={(props) => <Lanunch {...props} />}
          />
          {/* <Route exact path="/login">
            <Login />
          </Route> */}
          <Route exact path="/quiz" render={(props) => <Quiz {...props} />} />
          <Route
            exact
            path="/report"
            render={(props) => <Report {...props} />}
          />
          <Route exact path="/room">
            <Class />
          </Route>
          {/* <Route exact path="/room" render={(props) => <Class {...props} />} /> */}

          <Route exact path="/result">
            <Result />
          </Route>

          <Route exact path="/result/:id">
            <LiveResult />
          </Route>

          <Route exact path="/room/:id">
            <ClassStudent />
          </Route>

          <Route exact path="/lanunch/:id">
            <Result />
          </Route>

          <Route exact path="/createquiz/:quizId">
            <Createquiz />
          </Route>

          <Route exact path="/report/:reportId">
            <ShowReportByReportId />
          </Route>

          <Route exact path="/report/:reportId">
            <ShowReportByReportId />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(Navbar);
