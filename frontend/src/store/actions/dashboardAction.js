export const dashboardAction = {
    SET_ONLINE_USERS: "DASHBOARD.SET_ONLINE_USERS",
    SET_CHOSEN_CHAT_DETAILS: "DASHBOARD.SET_CHOSEN_CHAT_DETAILS",
    ADD_MESSAGE: "DASHBOARD.ADD_MESSAGE",
    SET_MESSAGES: "DASHBOARD.SET_MESSAGES",
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
