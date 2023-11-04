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

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) {
    return error;
  }

  if (isLoading) {
    return "Loading....";
  }

  if (data) {
    return (
      <main>
        <CreatePost />
        {data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post.comments}
          />
        ))}
      </main>
    );
  }
}
