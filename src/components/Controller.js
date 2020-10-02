import React, { useState } from 'react';
import App from './App';
import Trackdetail from './Trackdetail';
import { BrowserRouter as Router, Switch, Route,Link, useParams} from "react-router-dom";
export default function Controller(props){
  return(
    <Router forceRefresh={true}>
      <Switch>
        <Route path='/:id' > <Trackdetail/> </Route>
        <Route path='/'>  <App /> </Route>
      </Switch>
    </Router>
  );
}
function Track(){
  let { id } = useParams();
  return(
    <div>
      <h1>song id is: {id}</h1>
    </div>
  );
}
