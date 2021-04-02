import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: "0",
    // margin: "0",
    // background: 'linear-gradient(45deg, #138086, #534666)'
  },
  body: {
    background: "linear-gradient(45deg, #138086, #534666)",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  paper: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 10,
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
  title: {
    flexGrow: 1,
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "34px",
  },
  typoLogin: {
    fontFamily: "'Prompt', sans-serif",
    fontSize: "32px",
    fontWeight: 600,
  },
  button: {
    margin: "10px 0",
  },
  gridTypo: {
    marginTop: 24,
  },
  GridAppBar: {
    background: "linear-gradient(45deg, #138086, #534666)",
    position: "absolute",
  },
  appBar: {
    backgroundColor: "transparent",
  },
  content: {
    background: "linear-gradient(45deg, #138086, #534666)",
    height: "100%",
    width: "100%",
    padding: theme.spacing(12, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 2),
    },
  },
  typotitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "32px",
    padding: theme.spacing(3, 5),
  },
  typospace: {
    margin: theme.spacing(2, 2),
  },
  textfieldStu: {
    margin: theme.spacing(1, 1),
  },
}));

export { useStyles };
