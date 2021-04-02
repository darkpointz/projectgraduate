
// import React from "react";
// import AllRepairList from "../pages/AllRepairList";
import Launch from "../Page/quiz";
import Quiz from "../Page/quiz";
import Reports from "../Page/reports";
import Results from "../Page/results";
// import History from "../pages/History";
// import ListAltIcon from '@material-ui/icons/ListAlt';
import Class from "../Page/class";


export const ALL_MENUS = [
    {
        label: "LAUNCH",
        // icon: <SettingsIcon/>,
        // role: [Roles.USER],
        tabKey: "launch",
        component: Launch
    },
    {
        label: "QUIZZES",
        // icon: <ListAltIcon />,
        // role: [Roles.HEAD, Roles.SUPER_STAFF, Roles.STAFF],
        tabKey: "quizzes",
        component: Quiz
    },
    {
        label: "ROOMS",
        // icon: <HistoryIcon />,
        // role: [],
        tabKey: "rooms",
        component: Class
    },
    {
        label: "REPORTS",
        // icon: <MoreHorizIcon />,
        // role: [],
        tabKey: "reports",
        component: Reports
    },
    {
        label: "RESULTS",
        // icon: <MoreHorizIcon />,
        // role: [],
        tabKey: "results",
        component: Results
    }
]
