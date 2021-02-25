import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Learn from "./pages/learn";
import Create from "./pages/create";
import Profile from "./pages/profile";


function App() {
  const route_changer  = <NavBar />;
  const route_renderer = (<>
    <Switch>
      <Route path={"/explore"}>
        <Explore />
      </Route>
      <Route path={"/learn"}>
        <Learn />
      </Route>
      <Route path={"/create"}>
        <Create />
      </Route>
      <Route path={"/profile"}>
        <Profile />
      </Route>
      <Route path={'/'}>
        <Home />
      </Route>
    </Switch>
  </>);

  return (
    <Router>
      <div>
        {route_changer}
        {route_renderer}
      </div>
    </Router>
  );
}










export default App;
