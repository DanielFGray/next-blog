import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Layout from 'components/Layout'
import hydrate from 'next-mdx-remote/hydrate'
import { getStaticBlogPaths, mdxToString, readMdxFile, SourceWithMatter } from 'lib/mdx'
import Head from 'next/head'

const components = {}
const BlogPost: NextPage<SourceWithMatter> = ({ source, data }) => {
  const content = hydrate(source, { components })
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" key="title" content={data.title} />
        <meta name="description" content={data.excerpt} />
        <meta name="keywords" content={data.tags.join(', ')} />
      </Head>
      <pre className="px-8 mb-8 text-gray-200 whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div
        className={`
          max-w-4xl
          p-8
          md:rounded-lg
          bg-gray-50
          mx-auto
          prose
          dark:bg-gray-800
          dark:prose-dark
        `}
      >
        {content}
      </div>
    </Layout>
  )
}

export default BlogPost

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: SourceWithMatter }> => {
  if (! params?.slug) throw new Error('missing slug param')
  if (params.slug instanceof Array) throw new Error('too many slugs')
  const file = await readMdxFile(params.slug)
  const { data, source } = await mdxToString({ source: file, slug: params.slug, components })
  return { props: { data, source } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getStaticBlogPaths()
  return { paths, fallback: false }
}
