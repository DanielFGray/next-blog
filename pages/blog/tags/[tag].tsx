import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllFilesFrontMatter } from 'lib/mdx'
import { BlogCard } from 'components/BlogCards'
import Layout from 'components/Layout'

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
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default BlogList

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllFilesFrontMatter()
  const paths = Array.from(new Set(posts.flatMap(x => x.tags)))
    .map(tag => ({ params: { tag } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  if (!params?.tag) throw new Error('missing tag param')
  if (params.tag instanceof Array) throw new Error('too many slugs')
  const tag = params.tag
  const posts = (await getAllFilesFrontMatter())
    .filter(x => x.tags.includes(tag))
  return { props: { posts } }
}
