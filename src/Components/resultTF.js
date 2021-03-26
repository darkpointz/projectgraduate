import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles, Typography, Grid, Button, Paper } from "@material-ui/core";
import { teal, red } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridTF: {
        padding: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(3),
        },
    },
    btnTF: {
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 500,
        fontSize: "18px",
        marginRight: "18px",
        color: "#ffffff",
        width: "40%",
        [theme.breakpoints.down("sm")]: {
            width: "70%",
            marginRight: "14px",
        },
    },
    btnTrue: {
        backgroundColor: teal[400],
        marginLeft: "0px",
    },
    btnFalse: {
        backgroundColor: red[400],
        backgroundColor: "#fc5353",
    },
}));

export default function ResultTF({ quiz }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container className={classes.gridTF}>
                <Typography>{quiz.step}. {quiz.question}</Typography>
            </Grid>
        </div>
    )
}
