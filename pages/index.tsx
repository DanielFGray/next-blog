import type { NextPage, GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { BlogCard } from 'components/BlogCards'
import { getAllFilesFrontMatter } from 'lib/mdx'
import Feed from 'components/GitActivity'
import Link from 'next/link'

interface StaticProps {
  posts: FrontMatter[]
}

const BlogList: NextPage<StaticProps> = ({ posts }) => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 sm:mx-8 sm:rounded-lg">
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
            <div className="flex flex-col overflow-hidden shadow-lg">
              <Link href="/blog">
                <a
                  className={`
                    flex
                    flex-col
                    justify-around
                    flex-1
                    p-6
                    bg-white
                    rounded-lg
                    bg-gradient-to-br
                    from-white
                    to-gray-200
                    dark:bg-gray-800
                    dark:from-gray-800
                    dark:to-gray-900
                    dark:text-white
                  `}
                >
                  See more &mdash;&gt;
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Feed />
    </Layout>
  )
}

export default BlogList

export const getStaticProps: GetStaticProps = async (): Promise<{ props: StaticProps }> => {
  const posts = (await getAllFilesFrontMatter()).slice(0, 5)
  return { props: { posts } }
}
