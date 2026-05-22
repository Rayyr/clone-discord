import { dashboardAction } from "../actions/dashboardAction.js";

const initState = {
    onlineUsers: [],
    chosenChatDetails: null,
    messages: [],
    friends: [],
    pendingInvitations: [],
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
        case dashboardAction.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends,
            };
        case dashboardAction.SET_PENDING_INVITATIONS:
            return {
                ...state,
                pendingInvitations: action.pendingInvitations,
            };
        case dashboardAction.ADD_PENDING_INVITATION:
            if (state.pendingInvitations.some((invitation) => invitation._id === action.pendingInvitation._id)) {
                return state;
            }

            return {
                ...state,
                pendingInvitations: [...state.pendingInvitations, action.pendingInvitation],
            };
        case dashboardAction.REMOVE_PENDING_INVITATION:
            return {
                ...state,
                pendingInvitations: state.pendingInvitations.filter((invitation) => invitation._id !== action.id),
            };
        default:
            return state;
    }
};

export default reducer;
