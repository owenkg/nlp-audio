import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
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
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <PageWrapper>
          <Switch >

            <Route path="/" component={Home} />

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

          </Switch>
        </PageWrapper>
      </DndProvider>
    </HashRouter>
  );
}

export default App;
