import React from 'react'
import ago from 's-ago'
import Link from 'next/link'
import Tag from 'components/Tag'

export function BlogList({ posts }: { posts: FrontMatter[] }): JSX.Element {
  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export function BlogCard({ post }: { post: FrontMatter }): JSX.Element {
  const date = post.date ? new Date(post.updated || post.date) : null
  return (
    <div key={post.slug} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      {post.image && (
        <div className="flex-shrink-0 hidden">
          <img className="object-cover w-full h-48" src={post.image} alt="" />
        </div>
      )}
      <div
        className={`
          flex
          flex-col
          justify-between
          flex-1
          p-6
          bg-gradient-to-br
          bg-white
          from-white
          to-gray-200
          dark:bg-gray-800
          dark:from-gray-800
          dark:to-gray-900
        `}
      >
        <div className="flex-1">
          <p className="text-sm font-medium text-coolGray-500">
            <Link href="#">
              <a className="hover:underline">{post.category}</a>
            </Link>
          </p>
          <Link href={`/blog/${post.slug}`}>
            <a className="block mt-2">
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">{post.title}</p>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{post.excerpt}</p>
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-start mt-6">
          <div className="flex flex-wrap -ml-1 gap-x-1">
            {post.tags.map(tag => (
              <Link key={tag} href="#">
                <a>
                  <Tag
                    className={`
                      dark:bg-gray-700
                      dark:border-gray-700
                      dark:hover:border-gray-500
                      dark:text-gray-200
                    `}
                  >
                    {tag}
                  </Tag>
                </a>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap mt-2 text-sm text-gray-500 space-x-1">
            {date && <time dateTime={date.toLocaleDateString()}>{ago(date)}</time>}
            <span aria-hidden="true">·</span>
            <span>{post.words} words</span>
            <span aria-hidden="true">·</span>
            <span>{post.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
