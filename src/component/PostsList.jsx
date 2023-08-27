import React, {useState} from 'react'
import PostItem from "./PostItem";

export default function PostsList({posts, title, deletePost}) {

  return (
    
    <div>
        <h1>{title}</h1>
        {posts.map((post) => (
        <PostItem deletePost={deletePost} post={post} key={post.id} />
      ))}
    </div>
  )
}
