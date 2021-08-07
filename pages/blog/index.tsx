import type { GetStaticProps, NextPage } from 'next'
import { getAllFilesFrontMatter } from 'lib/mdx'
import Layout from 'components/Layout'
import { BlogList, BlogCard } from 'components/BlogCards'

interface StaticProps {
  posts: FrontMatter[]
}

const TagList: NextPage<StaticProps> = ({ posts }) => (
  <Layout>
    <BlogList>
      {posts.map(post => <BlogCard key={post.slug} post={post} />)}
    </BlogList>
  </Layout>
)

export default TagList

export const getStaticProps: GetStaticProps = async (): Promise<{ props: StaticProps }> => {
  const posts = await getAllFilesFrontMatter()
  return { props: { posts } }
}
