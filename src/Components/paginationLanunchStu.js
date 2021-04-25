import React, { useState } from "react";
import { reportService } from "../Services/reportService";
import clsx from "clsx";
import {
  NavigateNext,
  NavigateBefore,
  FirstPage,
  LastPage,
} from "@material-ui/icons";

import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconNavigate: {
    fontSize: "28px",
  },
  btnStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  btnTrue: {
    backgroundColor: "#1de9b6",
  },
}));

export default function PaginationLanunchStu({
  stepMax,
  current,
  answer,
  submitAnswer,
  setcurrent,
  quiz,
  quizzingStudent,
  SQ,
}) {
  const classes = useStyles();
  const [page, setpage] = useState(0);
  const [maxPage, setmaxPage] = useState(5);
  const [mid, setmid] = useState(2);

  const handleFirstPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    setcurrent(0);
    setpage(0);
    setmaxPage(5);
    setmid(2);
  };

  const handleLastPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    setcurrent(stepMax - 1);
    setpage(stepMax - 5);
    setmaxPage(stepMax);
    setmid(stepMax - 3);
  };

  const handleNavigateNext = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    if (current !== stepMax - 1) {
      setcurrent(current + 1);
    }

    if (maxPage === stepMax) {
    } else if (maxPage - current === 3) {
      setpage(page + 1);
      setmaxPage(maxPage + 1);
    }

    //setmid
    if (current + 1 >= 3 && current < stepMax - 3) {
      setmid(current + 1);
    }
  };

  const handleNavigateBefore = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    if (current !== 0) {
      setcurrent(current - 1);
    }

    if (page === 0) {
    } else if (maxPage - current === 3) {
      setpage(page - 1);
      setmaxPage(maxPage - 1);
    }

    //setmid
    if (current <= 3) {
      setmid(2);
    } else if (current > stepMax - 3) {
      setmid(stepMax - 3);
    } else if (current - 1 >= 3 && current > 3) {
      console.log("cuure: ", current);
      setmid(current - 1);
    }
  };

  const handleSelectPage = (index) => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }
    setcurrent(index);
    //กรณีกดขึ้นหน้า
    if (index > mid) {
      let increase = index - mid;
      //--ชนขอบไม่ต้องทำอะไร
      if (maxPage === stepMax) {
      }
      //กัน+2ไม่ให้เกินขอบเลย+แค่1
      else if (maxPage + increase === stepMax + 1) {
        setmaxPage(maxPage + 1);
        setpage(page + 1);
        setmid(mid + 1);
      } else {
        setmaxPage(maxPage + increase);
        setpage(page + increase);
        setmid(index);
      }
    }
    //กรณีกดถอยหลัง
    else if (mid > index) {
      let decrease = mid - index;
      //--ชนขอบไม่ต้องทำอะไร
      if (page === 0) {
      }
      //กัน-2แล้วเกินขอบเลย-1แค่1
      else if (page - decrease < 0) {
        setpage(page - 1);
        setmaxPage(maxPage - 1);
        setmid(mid - 1);
      } else {
        setmaxPage(maxPage - decrease);
        setpage(page - decrease);
        setmid(index);
      }
    }
  };

  const handleCheckStyleStep = (step, index) => {
    let tf = false;
    quizzingStudent.find((e) => {
      if (e.step === step && SQ === false) {
        tf = true;
      } else if (quiz[index].step === e.step && SQ === true) {
        tf = true;
      }
    });
    return tf;
  };
  return (
    <Grid container item xs={12} justify="center">
      <div style={{ marginRight: "8px" }}>
        <Button variant="outlined" onClick={handleFirstPage}>
          <FirstPage className={classes.iconNavigate} />
        </Button>
        <Button
          variant="outlined"
          onClick={handleNavigateBefore}
          disabled={current === 0}
        >
          <NavigateBefore className={classes.iconNavigate} />
        </Button>
      </div>

      {quiz.slice(page, maxPage).map((item, index) => (
        <Button
          key={item.step}
          variant="outlined"
          className={clsx(classes.btnStep, {
            [classes.btnTrue]: handleCheckStyleStep(item.step, index),
          })}
          // [classes.btnTrue]: handleCheckStyleStep(index),
          //--เก่า
          // onClick={() => handleSelectPage(item.step - 1)}
          onClick={() => handleSelectPage(index)}
        >
          {SQ === true ? index + 1 : item.step}
          {/* {item.step} */}
        </Button>
      ))}

      <div style={{ marginLeft: "8px" }}>
        <Button
          variant="outlined"
          onClick={handleNavigateNext}
          disabled={current === stepMax - 1}
        >
          <NavigateNext className={classes.iconNavigate} />
        </Button>
        <Button variant="outlined">
          <LastPage className={classes.iconNavigate} onClick={handleLastPage} />
        </Button>
      </div>
    </Grid>
  );
}
