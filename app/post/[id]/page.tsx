"use client";

import CommentPost from "@/app/components/CommentPost";
import CreateComment from "@/app/components/CreateComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import axios from "axios";
import { useQuery } from "react-query";

// Fetch post
const fetchPostById = async (id: string) => {
  const response = await axios.get("/api/posts/getPost", {
    params: { id: id },
  });
  return response.data;
};

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useQuery<PostType>(
    ["post", params.id],
    () => fetchPostById(params.id),
    {
      queryKey: [params.id], // Define queryKey as an option within an object
    },
  );

  if (error) {
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
        singlePost={true}
      />
      {data?.comments.length > 0 && (
        <div className="bg-neutral-800 rounded-b-lg p-2">
          {data?.comments?.map((comment) => (
            <CommentPost
              message={comment.message}
              name={comment.user.name}
              avatar={comment.user.image}
            />
          ))}
        </div>
      )}

      <CreateComment postId={params.id} />
    </div>
  );
}
