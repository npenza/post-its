import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function FollowButton({ userId, currentUser }: {userId: string , currentUser:any}) {
  const [following, setFollowing] = useState(false);
  const [placheholder, setPlaceholder] = useState(true);
  const queryClient = useQueryClient();
  let toastPostId = "following-action"

  useEffect(() => {
    if (currentUser?.id === userId) {
      setPlaceholder(false)
      return; // If it's the current user, do nothing
    }

    const isUserAlreadyFollowing = currentUser?.following?.some(
      (followingData) => followingData.followingId === userId,
    );

    if (isUserAlreadyFollowing) {
      setFollowing(true);
    }

    setPlaceholder(false)
  }, [userId, currentUser]);

  const submitFollowReq = async () => {
    toast.loading("Following user", { id: toastPostId });
    mutate();
  };

  const { mutate } = useMutation(
    async () => await axios.post("/api/users/followUser", { id: userId }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Could not follow user", { id: toastPostId });
        }
      },
      onSuccess: (data) => {
        toast.success("Followed!", { id: toastPostId });
        queryClient.invalidateQueries("follow-posts");
        setFollowing(true);
      },
    },
  );

  if (currentUser?.id === userId || !currentUser) {
    return null; // If it's the current user, render nothing
  }

  if(placheholder){
    return (
    <div>
        <p className="px-4 py-1 text-sm h-6 w-20 animate-pulse bg-neutral-600 text-gray-300 rounded-md">
        </p>
    </div>  
    )
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
