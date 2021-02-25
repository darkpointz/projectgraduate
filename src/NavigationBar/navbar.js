import React from "react";
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
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter, Route, Switch } from "react-router-dom";

import Lanunch from "../Page/lanunch";
import Report from "../Page/reports";
import Quiz from "../Page/quiz";
import Class from "../Page/class";
import ClassStudent from "../Components/classStudent";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    maxWidth: "1200px",
    padding: theme.spacing(12, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(10, 2),
    },
  },
}));

function Navbar(props) {
  const { history } = props;
  const { window } = props;
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itemsList = [
    {
      text: "Launch",
      onClick: () => history.push("/"),
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
      <Divider />
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Qton
          </Typography>
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
          <Route exact from="/" render={(props) => <Lanunch {...props} />} />
          <Route exact path="/quiz" render={(props) => <Quiz {...props} />} />
          <Route
            exact
            path="/report"
            render={(props) => <Report {...props} />}
          />
          <Route exact path="/room" render={(props) => <Class {...props} />} />
          <Route exact path="/room/:id">
            <ClassStudent />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(Navbar);
