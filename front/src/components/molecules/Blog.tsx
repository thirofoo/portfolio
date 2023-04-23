import Link from 'next/link'
import React from 'react'

type Article = {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
  slug: string
  description: string
  author: string
  thumbnail: string
  Tags: {
    ID: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    name: string
  }[]
  type: string
  body: string
}

// { props } : { propsの型宣言 } という形で書く
function Blog({ blog }: { blog: Article }) {
  return (
    <>
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
        <p>{blog.author}</p>
        <p>{blog.thumbnail}</p>
        <p>{blog.Tags.map((tag) => tag.name).join(', ')}</p>
        <p>{blog.type}</p>
        <p>{blog.body}</p>
      </div>
    </>
  )
}

export default Blog
