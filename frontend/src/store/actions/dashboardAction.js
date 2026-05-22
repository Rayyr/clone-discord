export const dashboardAction = {
    SET_ONLINE_USERS: "DASHBOARD.SET_ONLINE_USERS",
}

export const setOnlineUsers = (onlineUsers) => {
    return {
        type: dashboardAction.SET_ONLINE_USERS,
        onlineUsers,
    }
}
