"use client";

import axios from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "react-query";
import Post from "./components/Post";
import { PostType } from "./types/Post";
import { useState } from "react";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

// Fetch all posts
const followingPosts = async () => {
  const response = await axios.get("/api/posts/getFollowingPosts");
  return response.data;
};

const currentUser = async () => {
  const response = await axios.get("/api/users/getUser");
  return response.data;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("For You");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  const {
    data: followingPostData,
    error: followingPostError,
    isLoading: followingPostIsLoading,
  } = useQuery<PostType[]>({
    queryFn: followingPosts,
    queryKey: ["follow-posts"],
  });

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useQuery({
    queryFn: currentUser,
    queryKey: ["current-user"],
  });

  if (postError) {
    return "Error";
  }

  if (postIsLoading || userIsLoading) {
    return "Loading....";
  }

  return (
    <main>
      <CreatePost />
      <div className="flex flex-row bg-neutral-700  rounded-md items-center justify-evenly">
        <button
          onClick={() => handleTabChange("For You")}
          className={`tab-button  text-white p-3 duration-100 flex-1 text-lg ${
            activeTab === "For You"
              ? "active bg-neutral-600 rounded-md font-bold"
              : ""
          }`}
        >
          For You
        </button>
        <button
          onClick={() => handleTabChange("Following")}
          className={`tab-button  text-white p-3 duration-100 flex-1 text-lg ${
            activeTab === "Following"
              ? "active bg-neutral-600 rounded-md font-bold"
              : ""
          }`}
        >
          Following
        </button>
      </div>
      {activeTab === "For You" && postData && (
        <>
          {postData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.user.name}
              avatar={post.user.image}
              postTitle={post.title}
              comments={post.comments}
              userId={post.user.id}
              currentUser={userData ? userData : null}
            />
          ))}
        </>
      )}
      {activeTab === "Following" && followingPostData && (
        <>
          {followingPostData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.user.name}
              avatar={post.user.image}
              postTitle={post.title}
              comments={post.comments}
              userId={post.user.id}
              currentUser={userData ? userData : null}
            />
          ))}
        </>
      )}
    </main>
  );
}
