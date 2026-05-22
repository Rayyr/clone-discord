import { dashboardAction } from "../actions/dashboardAction.js";

const initState = {
    onlineUsers: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case dashboardAction.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            };
        default:
            return state;
    }
};

export default reducer;
