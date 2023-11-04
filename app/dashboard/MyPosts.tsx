"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { PostType } from "../types/Post";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<PostType[]>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Posts are loading</h1>;

  return (
    <div>
      {data?.Post?.map((post: PostType) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
