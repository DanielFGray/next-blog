import type { GetStaticProps, NextPage } from 'next'
import Layout from 'components/Layout'
import { getAllFilesFrontMatter } from 'lib/mdx'
import {descend} from 'lib/util'

interface StaticProps {
  tags: {name: string, count: number}[]
}

const BlogList: NextPage<StaticProps> = ({ tags }) => {
  return (
    <Layout>
      <pre>
        {JSON.stringify(tags, null, 2)}
      </pre>
    </Layout>
  )
}
export default BlogList

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = await getAllFilesFrontMatter()
  const tags = Object.entries(posts.flatMap(x => x.tags)
    .reduce((p: Record<string, number>, c: string) => {
      p[c] = (p[c] ? p[c] : 0) + 1
      return p
    }, {}))
    .map(([name, count]) => ({ name, count }))
    .sort(descend(x => x.count))
  return { props: { tags } }
}

