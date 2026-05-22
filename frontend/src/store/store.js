import {composeWithDevTools} from "redux-devtools-extension";
import {combineReducers,createStore,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import authReducer from "./reducers/authReducer.js";
import alertReducer from "./reducers/alertReducer.js";
import dashboardReducer from "./reducers/dashboardReducer.js";


const rootReducer=combineReducers({
    auth:authReducer,
    alert:alertReducer,
    dashboard:dashboardReducer
});

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;
