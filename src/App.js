import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
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

          <Switch>
            <Route
              /* exact={true} */
              exact path="/"
              component={Home}
            />

            <Route
              /* exact={true} */
              exact path="/results"
              component={Results}
            />

            <Route
              exact path="/tags"
              component={Tags}
            />


            <Route
              exact path="/upload"
              component={Upload}
            />

            <Route
              eaxct path="/status"
              component={Status}
            />

            {/* <Route
          path="/record"
          component={Voice}
        /> */}
          </Switch>
        </PageWrapper>
      </DndProvider>
    </Router>
  );
}

export default App;
