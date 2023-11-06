import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function FollowButton({
  userId,
  currentUser,
}: {
  userId: string;
  currentUser: any;
}) {
  
  // Query Client
  const queryClient = useQueryClient();

  // Use State for following a user
  const [following, setFollowing] = useState(false);
  const [placheholder, setPlaceholder] = useState(true);

  // Toast notification ID
  let toastPostId = "following-action";

  useEffect(() => {
    if (currentUser?.id === userId) {
      setPlaceholder(false);
      return; // If it's the current user, do nothing
    }

    // Is current user already following this user?
    const isUserAlreadyFollowing = currentUser?.following?.some(
      (followingData) => followingData.followingId === userId,
    );

    if (isUserAlreadyFollowing) {
      setFollowing(true);
    }

    // Disable placeholder
    setPlaceholder(false);

  }, [userId, currentUser]);

  // Submit follow request event
  const submitFollowReq = async () => {
    toast.loading("Following user", { id: toastPostId });
    mutate();
  };

  const { mutate } = useMutation(
    async () => await axios.post("/api/users/followUser", { id: userId }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Send error notification
          toast.error("Could not follow user", { id: toastPostId });
        }
      },
      onSuccess: (data) => {
        // Reset "Follow" button and posts
        setFollowing(true);
        toast.success("Followed!", { id: toastPostId });
        queryClient.invalidateQueries("follow-posts");
        queryClient.invalidateQueries("posts");
      },
    },
  );

  // Render nothing if current user is author
  if (currentUser?.id === userId || !currentUser) {
    return null; 
  }

  // Render Placeholder
  if (placheholder) {
    return (
      <div>
        <p className="px-4 py-1 text-sm h-6 w-20 animate-pulse bg-neutral-600 text-gray-300 rounded-md"></p>
      </div>
    );
  }

  // Follow button / Following label
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
