import React, { useState } from "react";

import {
    makeStyles,
    Paper,
    Button,
    FormControl,
    InputAdornment,
    Typography,
    Box,
    TextField,
    Grid,
    Dialog,
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import DialogCreateClass from "../Components/dialogCreateClass";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
    btnCreate: {
        display: "flex",
        borderRadius: "20px",
        backgroundColor: "#42ea5e",
        color: "white",
        height: "45px",
        [theme.breakpoints.down("sm")]: {
            height: "37px",
        },
    },
    iconAddQuiz: {
        marginRight: "3px",
    },
    typoAddQuiz: {
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 500,
        fontSize: "16px",
    },
    content: {
        flexGrow: 1,
    },
    paper: { backgroundColor: "#6DC8BE", flexGrow: 1, paddingTop: "16px" },
    inputRoot: {
        color: "inherit",
    },
    formtextfield: {
        width: "55%",
    },
    textfieldSearch: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create("width"),
        // [theme.breakpoints.up("md")]: {
        //   width: "20ch",
        // },
    },
    typotitlePaper: {
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 500,
        fontSize: "26px",
        marginLeft: "16px",
    },
}));

export default function Class() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [btnCreate, setbtnCreate] = useState(false);

    const clickCreate = () => {
        setOpen(true);
        // setbtnCreate(!btnCreate);
    };
    const handleClose = (value) => {
        setOpen(false);
        if (value === "CN") {
            setbtnCreate(true);
        }
    };
    return (
        <div className={classes.root}>
            {!btnCreate ? (
                <Grid container spacing={3} direction="column">
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={6} container alignItems="center">
                            <Typography className={classes.typotitlePaper}>Class</Typography>
                        </Grid>
                        <Grid item xs={6} container justify="flex-end" alignItems="center">
                            <Button
                                variant="contained"
                                className={classes.btnCreate}
                                onClick={() => setOpen(true)}
                            >
                                <Add className={classes.iconAddQuiz} />
                                <Typography className={classes.typoAddQuiz}>
                                    Createclass
                         </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} >
                        <Paper className={classes.paper}>
                            <Typography className={classes.typotitlePaper}>Class</Typography>
                        </Paper>
                    </Grid>
                    <DialogCreateClass open={open} onClose={handleClose}></DialogCreateClass>
                </Grid>

            )
                : (
                    <div className={classes.content}>
                        asd
                        <hr />
                    </div>
                )}

        </div>
    )
}
