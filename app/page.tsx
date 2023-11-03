"use client";

import axios from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "react-query";

// Fetch all post
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
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
    console.log(data);

    return (
      <main>
        <CreatePost />
      </main>
    );
  }
}
