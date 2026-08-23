export const API = {
  AUTH: {
    REGISTER: "/v1/api/auth/register",
    LOGIN: "/v1/api/auth/login",
    REFRESH: "/v1/api/auth/refresh",
    LOGOUT: "/v1/api/auth/logout",
  },

  USER: {
    ME: "/v1/api/users/me",
    UPDATE_PROFILE: "/v1/api/users/me",
    UPDATE_AVATAR: "/v1/api/users/avatar",
    UPDATE_STATUS: "/v1/api/users/status",
    SEARCH: "/v1/api/users/search",
    DELETE_ME: "/v1/api/users/me",
  },

  FRIEND: {
    LIST: "/v1/api/friends",
    SEND_REQUEST: "/v1/api/friends/requests",
    ACCEPT_REQUEST: (requestId) =>
      `/v1/api/friends/requests/${requestId}/accept`,
    REJECT_REQUEST: (requestId) =>
      `/v1/api/friends/requests/${requestId}/reject`,
    CANCEL_REQUEST: (requestId) => `/v1/api/friends/requests/${requestId}`,
    UNFRIEND: (friendId) => `/v1/api/friends/${friendId}`,
    RECEIVED_REQUESTS: "/v1/api/friends/requests/received",
    SENT_REQUESTS: "/v1/api/friends/requests/sent",
  },

  CONVERSATION: {
    LIST: "/v1/api/conversations",
    DETAIL: (conversationId) => `/v1/api/conversations/${conversationId}`,

    CREATE_DIRECT: "/v1/api/conversations/direct",
    CREATE_GROUP: "/v1/api/conversations/group",

    ADD_PARTICIPANT: (conversationId) =>
      `/v1/api/conversations/${conversationId}/participants`,
    REMOVE_PARTICIPANT: (conversationId, userId) =>
      `/v1/api/conversations/${conversationId}/participants/${userId}`,
  },

  MESSAGE: {
    CREATE: "/v1/api/messages",

    LIST: (conversationId) => `/v1/api/messages/${conversationId}`,

    DELETE: (messageId) => `/v1/api/messages/${messageId}`,
  },
};
