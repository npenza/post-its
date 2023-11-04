"use client"

import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import axios from "axios";
import { useQuery } from "react-query";

// Fetch post
const fetchPostById = async (id: string) => {
  const response = await axios.get("/api/posts/getPost", { params: { id : id } });
  
  return response.data;
};

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useQuery<PostType>(
    ['post', params.id],
    () => fetchPostById(params.id)
  );

  if (error) {
    console.log(error)
    return error;
  }

  if (isLoading) {
    return "Loading....";
  }

  return (
    <div>
      <Post
        key={data.id}
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.comments}
      />
    </div>
  );
}
