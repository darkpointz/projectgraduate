import React, { useState, useEffect, forwardRef } from "react";
import { classService } from "../Services/classService";
import MaterialTable from "material-table";
import {
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Clear,
  ArrowDownward,
} from "@material-ui/icons";

import { makeStyles, withStyles, TableCell } from "@material-ui/core";

const useStyles = makeStyles({
  tableMaterial: {},
});

export default function TableSelectClass(props) {
  const { setselectClass, selectClass } = props;
  const classes = useStyles();
  const [room, setroom] = useState([]);
  const [select, setselect] = useState();

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    setselect(selectClass);
    classService.getAllRoom(uId).then((res) => {
      setroom(res);
    });
  }, []);

  const tableIcons = {
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };

  const handleSelect = (selectedRow) => {
    setselect(selectedRow);
    setselectClass(selectedRow);
    console.log("selectedRow", selectedRow.student);
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        //className={classes.tableMaterial}
        title="Select Class"
        columns={[
          {
            title: "ClassName",
            field: "roomName",
            headerStyle: {
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
            },
          },
          // { title: "Surname", field: "roomId" },
        ]}
        data={room}
        options={{
          // selection: true,
          rowStyle: (selectedRow) => {
            let selected = select && select.roomId === selectedRow.roomId;
            return {
              backgroundColor: selected ? "#6DC8BE" : "#FFF",
              color: selected ? "#e0dd1f !important" : "#000",
            };
          },
        }}
        onRowClick={(event, selectedRow) => {
          handleSelect(selectedRow);
        }}
      />

      {/* <TableContainer>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell
                align="center"
                padding="checkbox"
                className={classes.TableCellHead}
              >
                Select
              </TableCell>
              <TableCell align="center" className={classes.TableCellHead}>
                Room
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room &&
              room.map((room, i) => (
                <TableRow key={room.roomId}>
                  <TableCell scope="row" className={classes.TableCellContent}>
                    {room.roomName}
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    className={classes.TableCellContent}
                  >
                    {room.roomName}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
