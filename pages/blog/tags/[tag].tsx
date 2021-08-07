import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllFilesFrontMatter } from 'lib/mdx'
import { BlogCard, BlogList } from 'components/BlogCards'
import Layout from 'components/Layout'

interface StaticProps {
  posts: FrontMatter[]
}

const TagList: NextPage<StaticProps> = ({ posts }) => (
  <Layout>
    <BlogList>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </BlogList>
  </Layout>
)

export default TagList

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
