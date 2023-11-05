"use client";

import axios from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "react-query";
import Post from "./components/Post";
import { PostType } from "./types/Post";

// Fetch all post
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

const currentUser = async () => {
  const response = await axios.get("/api/users/getUser");
  return response.data;
};

export default function Home() {
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
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

  if (postIsLoading && userIsLoading) {
    return "Loading....";
  }

  if (postData) {
    return (
      <main>
        <CreatePost />
        {postData?.map((post) => (
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
      </main>
    );
  }
}
