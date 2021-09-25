import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import PageWrapper from "./Components/Layout/PageWrapper";
import Results from "./Components/results";
import Upload from "./Components/upload";
import Home from "./Components/home"
import Tags from "./Components/tags";
//import Voice from "./Components/voice"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
      <PageWrapper>
        <NotificationContainer>

        <Route
          exact={true}
          path="/"
          component={Home}
        />

        <Route
          exact={true}
          path="/results"
          component={Results}
        />

        <Route
          path="/tags"
          component={Tags}
        />


        <Route
          path="/upload"
          component={Upload}
        />

        {/* <Route
          path="/record"
          component={Voice}
        /> */}
      </NotificationContainer>
      </PageWrapper>
      </DndProvider>
    </Router>
  );
}

export default App;
