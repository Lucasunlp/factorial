import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Contacts from "../components/Contacts";
import Contact from "../components/Contact";
import NewContact from "../components/NewContact";
import UpdateContact from "../components/UpdateContact";

export default (
  <Router>
    <Switch>
      <Route path="/contacts/:id/edit" component={UpdateContact}/>
      <Route path="/contact" exact component={NewContact} />
      <Route path="/" exact component={Home} />
      <Route path="/contacts" exact component={Contacts} />
      <Route path="/contact/:id" exact component={Contact} />
  />
  />
    </Switch>
  </Router>
);
