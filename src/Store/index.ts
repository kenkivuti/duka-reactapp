import { createStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "./reducers";

const rootReducer = combineReducers({
    // auth:authReducer
});

const store = createStore(
    rootReducer,
);

export default store;