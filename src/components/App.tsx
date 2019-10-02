import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PostList from "./PostList";
import UserHeader from "./UserHeader";
import ShowPost from "./ShowPost";

const App = () => {
  return (
    <div className="ui center aligned container">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={UserHeader} />
          <Route path="/users/:id" exact component={PostList} />
          <Route path="/users/:id/:ids" exact component={ShowPost} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
