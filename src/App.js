import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import PageWrapper from "./Components/Layout/PageWrapper";
import Results from "./Components/results";
import Upload from "./Components/upload";
import Status from "./Components/status";
import Home from "./Components/home";
import Tags from "./Components/tags";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import Voice from "./Components/voice"
function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <PageWrapper>


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

          <Route
            path="/status"
            component={Status}
          />

          {/* <Route
          path="/record"
          component={Voice}
        /> */}

        </PageWrapper>
      </DndProvider>
    </Router>
  );
}

export default App;
