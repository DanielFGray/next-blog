import type { NextPage, GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { BlogCard, BlogList } from 'components/BlogCards'
import { getAllFilesFrontMatter } from 'lib/mdx'
import Link from 'next/link'

interface StaticProps {
  posts: FrontMatter[]
}

const Home: NextPage<StaticProps> = ({ posts }) => {
  return (
    <Layout>
      <BlogList>
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
      </BlogList>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (): Promise<{ props: StaticProps }> => {
  const posts = (await getAllFilesFrontMatter()).slice(0, 5)
  return { props: { posts } }
}
