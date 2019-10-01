import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import postsReducer from "./reducers/postsReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  postsReducer,
  userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
