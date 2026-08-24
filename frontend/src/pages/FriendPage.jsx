import { useEffect, useState, useCallback } from "react";

import * as friendService from "../features/friend/friend.service";
import * as userService from "../features/user/user.service";

import FriendHeader from "../features/friend/components/FriendHeader";
import FriendTabs from "../features/friend/components/FriendTabs";
import FriendSearch from "../features/friend/components/FriendSearch";
import FriendSearchResult from "../features/friend/components/FriendSearchResult";
import FriendList from "../features/friend/components/FriendList";
import FriendRequestList from "../features/friend/components/FriendRequestList";
import FriendSentRequestList from "../features/friend/components/SentRequestList";

const FriendPage = () => {
  // ==============================
  // DATA
  // ==============================
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  // ==============================
  // TAB
  // ==============================
  const [activeTab, setActiveTab] = useState("friends");

  // ==============================
  // SEARCH
  // ==============================
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // ==============================
  // LOADING
  // ==============================
  const [refreshing, setRefreshing] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [receivedLoading, setReceivedLoading] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);

  // ==============================
  // LOAD FRIENDS
  // ==============================
  const loadFriends = useCallback(async () => {
    try {
      setFriendsLoading(true);
      const data = await friendService.getFriends();
      setFriends(data || []);
    } catch (error) {
      console.error("Load friends error:", error);
    } finally {
      setFriendsLoading(false);
    }
  }, []);

  // ==============================
  // LOAD RECEIVED REQUESTS
  // ==============================
  const loadReceivedRequests = useCallback(async () => {
    try {
      setReceivedLoading(true);
      const data = await friendService.getReceivedRequests();
      setReceivedRequests(data ?? []);
    } catch (error) {
      console.error("Load received requests error:", error);
    } finally {
      setReceivedLoading(false);
    }
  }, []);

  // ==============================
  // LOAD SENT REQUESTS
  // ==============================
  const loadSentRequests = useCallback(async () => {
    try {
      setSentLoading(true);
      const data = await friendService.getSentRequests();
      setSentRequests(data ?? []);
    } catch (error) {
      console.error("Load sent requests error:", error);
    } finally {
      setSentLoading(false);
    }
  }, []);

  // ==============================
  // INITIAL LOAD
  // ==============================
  useEffect(() => {
    loadFriends();
    loadReceivedRequests();
    loadSentRequests();
  }, [loadFriends, loadReceivedRequests, loadSentRequests]);

  // ==============================
  // REFRESH ALL
  // ==============================
  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        loadFriends(),
        loadReceivedRequests(),
        loadSentRequests(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [loadFriends, loadReceivedRequests, loadSentRequests]);
  // ==============================
  // SEARCH USERS
  // ==============================
  useEffect(() => {
    const keyword = search.trim();

    if (keyword.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const data = await userService.searchUsers({
          keyword,
        });
        setSearchResults(data ?? []);
      } catch (error) {
        console.error("Search users error:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ==============================
  // SEND FRIEND REQUEST
  // ==============================
  const handleSendRequest = async (userId) => {
    try {
      await friendService.sendFriendRequest({ to: userId });

      // Reload sent requests
      await loadSentRequests();

      // Cập nhật tạm thời trạng thái trong danh sách kết quả tìm kiếm (nếu có)
      setSearchResults((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, relationshipStatus: "request_sent" }
            : user,
        ),
      );
    } catch (error) {
      console.error("Send friend request error:", error);
    }
  };

  // ==============================
  // ACCEPT FRIEND REQUEST
  // ==============================
  const handleAccept = async (requestId) => {
    try {
      await friendService.acceptFriendRequest(requestId);

      // Xóa request khỏi danh sách received
      setReceivedRequests((prev) =>
        prev.filter((item) => item.id !== requestId),
      );

      // Reload friends
      await loadFriends();
    } catch (error) {
      console.error("Accept friend request error:", error);
    }
  };

  // ==============================
  // REJECT FRIEND REQUEST
  // ==============================
  const handleReject = async (requestId) => {
    try {
      await friendService.rejectFriendRequest(requestId);

      // Xóa request khỏi danh sách received
      setReceivedRequests((prev) =>
        prev.filter((item) => item.id !== requestId),
      );
    } catch (error) {
      console.error("Reject friend request error:", error);
    }
  };

  // ==============================
  // CANCEL SENT REQUEST
  // ==============================
  const handleCancel = async (requestId) => {
    try {
      await friendService.cancelFriendRequest(requestId);

      // Xóa request khỏi danh sách sent
      setSentRequests((prev) => prev.filter((item) => item.id !== requestId));
    } catch (error) {
      console.error("Cancel friend request error:", error);
    }
  };

  // ==============================
  // UNFRIEND
  // ==============================
  const handleUnfriend = async (userId) => {
    try {
      await friendService.unfriend(userId);

      // Xóa friend khỏi UI
      setFriends((prev) => prev.filter((item) => item.id !== userId));
    } catch (error) {
      console.error("Unfriend error:", error);
    }
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="flex h-screen flex-col p-4">
      {/* HEADER */}
      <FriendHeader onRefresh={handleRefresh} refreshing={refreshing} />

      {/* TABS */}
      <FriendTabs
        value={activeTab}
        onValueChange={setActiveTab}
        friendCount={friends.length}
        requestCount={receivedRequests.length}
        sentCount={sentRequests.length}
      />

      {/* CONTENT AREA */}
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
        {/* FRIENDS */}
        {activeTab === "friends" && (
          <>
            <FriendSearch value={search} onChange={setSearch} />

            {search.trim() ? (
              <FriendSearchResult
                users={searchResults}
                loading={searchLoading}
                onSendRequest={handleSendRequest}
              />
            ) : (
              <FriendList
                friends={friends}
                loading={friendsLoading}
                onUnfriend={handleUnfriend}
              />
            )}
          </>
        )}

        {/* RECEIVED REQUESTS */}
        {activeTab === "requests" && (
          <FriendRequestList
            requests={receivedRequests}
            loading={receivedLoading}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

        {/* SENT REQUESTS */}
        {activeTab === "sent" && (
          <FriendSentRequestList
            requests={sentRequests}
            loading={sentLoading}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default FriendPage;
