export const dashboardAction = {
    SET_ONLINE_USERS: "DASHBOARD.SET_ONLINE_USERS",
    SET_CHOSEN_CHAT_DETAILS: "DASHBOARD.SET_CHOSEN_CHAT_DETAILS",
    ADD_MESSAGE: "DASHBOARD.ADD_MESSAGE",
    SET_MESSAGES: "DASHBOARD.SET_MESSAGES",
    MARK_MESSAGES_READ: "DASHBOARD.MARK_MESSAGES_READ",
    SET_UNREAD_MESSAGES: "DASHBOARD.SET_UNREAD_MESSAGES",
    CLEAR_UNREAD_MESSAGES: "DASHBOARD.CLEAR_UNREAD_MESSAGES",
    SET_FRIENDS: "DASHBOARD.SET_FRIENDS",
    SET_CHANNELS: "DASHBOARD.SET_CHANNELS",
    ADD_CHANNEL: "DASHBOARD.ADD_CHANNEL",
    UPDATE_CHANNEL: "DASHBOARD.UPDATE_CHANNEL",
    SET_PENDING_INVITATIONS: "DASHBOARD.SET_PENDING_INVITATIONS",
    ADD_PENDING_INVITATION: "DASHBOARD.ADD_PENDING_INVITATION",
    REMOVE_PENDING_INVITATION: "DASHBOARD.REMOVE_PENDING_INVITATION",
}

export const setOnlineUsers = (onlineUsers) => {
    return {
        type: dashboardAction.SET_ONLINE_USERS,
        onlineUsers,
    }
}

export const setChosenChatDetails = (chosenChatDetails) => {
    return {
        type: dashboardAction.SET_CHOSEN_CHAT_DETAILS,
        chosenChatDetails,
    }
}

export const addMessage = (message) => {
    return {
        type: dashboardAction.ADD_MESSAGE,
        message,
    }
}

export const setMessages = (messages) => {
    return {
        type: dashboardAction.SET_MESSAGES,
        messages,
    }
}

export const markMessagesRead = ({ messageIds, readAt }) => {
    return {
        type: dashboardAction.MARK_MESSAGES_READ,
        messageIds,
        readAt,
    }
}

export const setUnreadMessages = (unreadMessages) => {
    return {
        type: dashboardAction.SET_UNREAD_MESSAGES,
        unreadMessages,
    }
}

export const clearUnreadMessages = (userId) => {
    return {
        type: dashboardAction.CLEAR_UNREAD_MESSAGES,
        userId,
    }
}

export const setFriends = (friends) => {
    return {
        type: dashboardAction.SET_FRIENDS,
        friends,
    }
}

export const setChannels = (channels) => {
    return {
        type: dashboardAction.SET_CHANNELS,
        channels,
    }
}

export const addChannel = (channel) => {
    return {
        type: dashboardAction.ADD_CHANNEL,
        channel,
    }
}

export const updateChannel = (channel) => {
    return {
        type: dashboardAction.UPDATE_CHANNEL,
        channel,
    }
}

export const setPendingInvitations = (pendingInvitations) => {
    return {
        type: dashboardAction.SET_PENDING_INVITATIONS,
        pendingInvitations,
    }
}

export const addPendingInvitation = (pendingInvitation) => {
    return {
        type: dashboardAction.ADD_PENDING_INVITATION,
        pendingInvitation,
    }
}

export const removePendingInvitation = (id) => {
    return {
        type: dashboardAction.REMOVE_PENDING_INVITATION,
        id,
    }
}
