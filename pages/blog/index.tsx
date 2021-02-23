import type { GetStaticProps, NextPage } from 'next'
import { getAllFilesFrontMatter } from 'lib/mdx'
import Layout from 'components/Layout'
import { BlogCard } from 'components/BlogCards'

interface StaticProps {
  posts: FrontMatter[]
}

const BlogList: NextPage<StaticProps> = ({ posts }) => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 sm:mx-8 sm:rounded-lg">
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default BlogList

export const getStaticProps: GetStaticProps = async (): Promise<{ props: StaticProps }> => {
  const posts = await getAllFilesFrontMatter()
  return { props: { posts } }
}
