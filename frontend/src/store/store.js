import {combineReducers,createStore,applyMiddleware,compose} from "redux";
import {thunk} from "redux-thunk";
import authReducer from "./reducers/authReducer.js";
import alertReducer from "./reducers/alertReducer.js";
import dashboardReducer from "./reducers/dashboardReducer.js";


const rootReducer=combineReducers({
    auth:authReducer,
    alert:alertReducer,
    dashboard:dashboardReducer
});

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;
