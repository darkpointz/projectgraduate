import React, { useState, useContext } from "react";
import "./login.css";
import {
  makeStyles,
  IconButton,
  Button,
  FormControl,
  Typography,
  Box,
  Grid,
  Container,
  Paper,
  ThemeProvider,
  createMuiTheme,
  colors,
  CssBaseline,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { lightGreen } from "@material-ui/core/colors";

// import StudentLogin from './component/studentlogin.js'
// import TeacherLogin from './component/teacherlogin.js'

const theme = createMuiTheme({
//   typography: {
//     fontFamily: "'Poppins', sans-serif",
//     h2: {
//       fontWeight: 700,
//       fontSize: 39,
//     },
//   },
  palette: {
    primary: {
      main: "#138086",
    },
    secondary: {
      main: "#534666",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    m: 0,
    p: 0,
    // padding: "0",
    // margin: "0",
    // background: 'linear-gradient(45deg, #138086, #534666)'
  },
  body: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    background: "linear-gradient(45deg, #138086, #534666)",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  paper: {
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexGrow: 1,
    width: "500px",
    position: "absolute",
  },
  textfield: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 24,
    [theme.breakpoints.down("sm")]: {
        margin: "10px 10px",
    },
  },
  l: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 39,
    fontWeight: 400,
    marginTop: 24,
  },
  button: {
    marginTop: 24,
    marginBottom: 15,
  },
}));

// const handleLoginStudent = () => {
//   setInputFields([...inputFields, { Name: "", Room: "" }]);
// };

export default function Login() {
  const classes = useStyles();
  const [showStu, setStuShow] = useState(false);
  const [showTea, setTeaShow] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.body} margin="0%">
        <Grid className={classes.paper} container item xs={8}>
          <Typography classesName={classes.l}>
            LOGIN
          </Typography>

          <Grid className={classes.textfield}>
            {showStu ? (
              <div>
                <TextField
                  id="Name"
                  label="Name"
                  variant="outlined"
                  placeholder="Type your name"
                />
                <TextField
                  id="RoomName"
                  label="Room"
                  variant="outlined"
                  placeholder="Type name room"
                />
              </div>
            ) : null}
            {showTea ? (
              <div>
                <TextField
                  id="Name"
                  label="Name"
                  variant="outlined"
                  placeholder="Type your name"
                />
                <TextField
                  id="RoomName"
                  label="Room"
                  variant="outlined"
                  placeholder="Type name room"
                />
              </div>
            ) : null}
          </Grid>

          <Grid classname={classes.button} container justify="space-evenly">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              // onClick={() => handleLoginStudent()}
              onClick={() => setStuShow(!showStu)}
            >
              Student
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setTeaShow(!showTea)}
              // onClick={() => handleLoginTeacher()}
            >
              Teacher
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
