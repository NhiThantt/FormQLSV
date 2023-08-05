import { createStore, combineReducers } from "redux";

import { reactFormReducer } from "./react-form/react-form.reducer";

const rootReducer = combineReducers({
 
  reactFormReducer,
});

// redux store. tập trung tất cả state của ứng dụng.

export const store = createStore(
  rootReducer,
  // extension cho redux.
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
