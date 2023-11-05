import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function FollowButton({ userId, currentUser }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (currentUser?.id === userId) {
      return; // If it's the current user, do nothing
    }

    const isUserAlreadyFollowing = currentUser?.following?.some(
      (followingData) => followingData.followingId === userId,
    );

    if (isUserAlreadyFollowing) {
      setFollowing(true);
    }
  }, [userId, currentUser]);

  const submitFollowReq = async () => {
    const toastPostId = toast.loading("Following user");
    try {
      await axios.post("/api/users/followUser", { id: userId });
      toast.success("Followed!", { id: toastPostId });
      setFollowing(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error("Could not follow user", { id: toastPostId });
      }
    }
  };

  if (currentUser?.id === userId || !currentUser) {
    return null; // If it's the current user, render nothing
  }

  return (
    <div>
      {following ? (
        <p className="px-4 py-1 text-sm bg-neutral-600 text-gray-300 rounded-md">
          Following
        </p>
      ) : (
        <button
          className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md duration-100"
          onClick={submitFollowReq}
        >
          Follow
        </button>
      )}
    </div>
  );
}
