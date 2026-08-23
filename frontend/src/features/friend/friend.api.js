import api from "../../lib/axios";
import { API } from "../../constants/api";

export const getFriends = async () => {
  const response = await api.get(API.FRIEND.LIST);

  return response.data.data;
};

export const sendFriendRequest = async ({ to, message = "" }) => {
  const response = await api.post(API.FRIEND.SEND_REQUEST, { to, message });

  return response.data.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await api.post(API.FRIEND.ACCEPT_REQUEST(requestId));

  return response.data.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await api.post(API.FRIEND.REJECT_REQUEST(requestId));

  return response.data.data;
};

export const cancelFriendRequest = async (requestId) => {
  const response = await api.delete(API.FRIEND.CANCEL_REQUEST(requestId));

  return response.data.data;
};

export const unfriend = async (friendId) => {
  const response = await api.delete(API.FRIEND.UNFRIEND(friendId));

  return response.data.data;
};

export const getReceivedRequests = async () => {
  const response = await api.get(API.FRIEND.RECEIVED_REQUESTS);

  return response.data.data;
};

export const getSentRequests = async () => {
  const response = await api.get(API.FRIEND.SENT_REQUESTS);

  return response.data.data;
};
