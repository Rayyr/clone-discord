import { dashboardAction } from "../actions/dashboardAction.js";

const initState = {
    onlineUsers: [],
    chosenChatDetails: null,
    messages: [],
    unreadMessages: {},
    friends: [],
    channels: [],
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
                unreadMessages: action.chosenChatDetails?.type !== "channel" && action.chosenChatDetails
                    ? {
                        ...state.unreadMessages,
                        [action.chosenChatDetails.id]: 0,
                    }
                    : state.unreadMessages,
            };
        case dashboardAction.ADD_MESSAGE:
            const messageAlreadyAdded = state.messages.some((message) => message.id === action.message.id);
            const isChannelMessage = Boolean(action.message.channelId);
            const unreadKey = isChannelMessage ? action.message.channelId : action.message.senderUserId;
            const shouldMarkUnread = !isChannelMessage && !messageAlreadyAdded && !action.message.isOwn && state.chosenChatDetails?.id !== action.message.senderUserId;

            return {
                ...state,
                messages: messageAlreadyAdded ? state.messages : [...state.messages, action.message],
                unreadMessages: shouldMarkUnread
                    ? {
                        ...state.unreadMessages,
                        [unreadKey]: (state.unreadMessages[unreadKey] || 0) + 1,
                    }
                    : state.unreadMessages,
            };
        case dashboardAction.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        case dashboardAction.MARK_MESSAGES_READ:
            return {
                ...state,
                messages: state.messages.map((message) =>
                    action.messageIds.includes(message.id)
                        ? {
                            ...message,
                            isRead: true,
                            readAt: action.readAt,
                        }
                        : message
                ),
            };
        case dashboardAction.SET_UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: action.unreadMessages,
            };
        case dashboardAction.CLEAR_UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: {
                    ...state.unreadMessages,
                    [action.userId]: 0,
                },
            };
        case dashboardAction.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends,
            };
        case dashboardAction.SET_CHANNELS:
            return {
                ...state,
                channels: action.channels,
            };
        case dashboardAction.ADD_CHANNEL:
            return {
                ...state,
                channels: state.channels.some((channel) => channel.id === action.channel.id)
                    ? state.channels.map((channel) =>
                        channel.id === action.channel.id ? action.channel : channel
                    )
                    : [...state.channels, action.channel],
            };
        case dashboardAction.UPDATE_CHANNEL:
            return {
                ...state,
                channels: state.channels.map((channel) =>
                    channel.id === action.channel.id ? action.channel : channel
                ),
                chosenChatDetails: state.chosenChatDetails?.type === "channel" &&
                    state.chosenChatDetails.id === action.channel.id &&
                    !action.channel.isMember
                    ? null
                    : state.chosenChatDetails,
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
