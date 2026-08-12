export const API = {
  AUTH: {
    REGISTER: "/v1/api/auth/register",
    LOGIN: "/v1/api/auth/login",
    REFRESH: "/v1/api/auth/refresh",
    LOGOUT: "/v1/api/auth/logout",
  },

  USER: {
    ME: "/v1/api/users/me",
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
