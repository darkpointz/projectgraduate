import React, { useEffect, useState } from "react";
import Navbar from "../NavigationBar/navbar";
import Login from "../Pages/login";
import LoginByroomName from "../Pages/loginByUserRoomName";
import LanunchStuCBS from "../Pages/lanunchStuCBS";
import { withRouter, Route, Switch } from "react-router-dom";
import NavbarStudent from "../NavigationBar/navbarStudent";
import LoginTeacher from "../Pages/loginTeacher";

export default function ProtectedRoute({ currentUser, userStudent }) {
  return (
    <>
      <Switch>
        {currentUser ? (
          <Navbar
            displayName={currentUser.displayName}
            displayPic={currentUser.photoURL}
          />
        ) : (
          <>
            {/* <Route path="/LanunchStuCBS/:reportId/:name">
              <LanunchStuCBS />
            </Route> */}
            <Route path="/LanunchStuCBS/:reportId/:stuid">
              <LanunchStuCBS />
            </Route>
            <Route path="/login/student">
              <NavbarStudent />
            </Route>
            <Route path="/login/teacher">
              <LoginTeacher />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
}

//----
// {currentUser ? (
//   <Navbar
//     displayName={currentUser.displayName}
//     displayPic={currentUser.photoURL}
//   />
// ) : userStudent ? (
//   <Route path="/LanunchStu/:reportId/:stuid">
//     <LanunchStu />
//   </Route>
// ) : (
//   <>
//     <Route path="/login/student">
//       <NavbarStudent />
//     </Route>
//     <Route path="/login/teacher">
//       <LoginTeacher />
//     </Route>
//     <Route exact path="/">
//       <Login />
//     </Route>
//   </>
// )}
