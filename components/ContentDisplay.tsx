"use client";
import { PostProps } from "@/types";
import { useState } from "react";
import PostPreview from "./PostPreview";
import NewPostForm from "./NewPostForm";

export default function ContentDisplay() {
  const [latestPost, setLatestPost] = useState<PostProps | null>(null);

  function append(newPost: PostProps) {
    setLatestPost(newPost);
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <NewPostForm append={append} />
        {latestPost && <PostPreview key={latestPost.id} post={latestPost} />}
      </div>
  );
}
