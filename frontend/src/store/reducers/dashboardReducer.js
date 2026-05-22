import { dashboardAction } from "../actions/dashboardAction.js";

const initState = {
    onlineUsers: [],
    chosenChatDetails: null,
    messages: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case dashboardAction.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            };
        case dashboardAction.SET_CHOSEN_CHAT_DETAILS:
            return {
                ...state,
                chosenChatDetails: action.chosenChatDetails,
            };
        case dashboardAction.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message],
            };
        case dashboardAction.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        default:
            return state;
    }
};

export default reducer;
