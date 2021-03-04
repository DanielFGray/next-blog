import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { getStaticBlogPaths, mdxToString, readMdxFile, SourceWithMatter } from 'lib/mdx'
import Head from 'next/head'
import Link from 'next/link'
import ago from 's-ago'
import Layout from 'components/Layout'
import Tag from 'components/Tag'

const components = {}
const BlogPost: NextPage<SourceWithMatter> = ({ source, data }) => {
  const content = hydrate(source, { components })
  const date = new Date(data.date)
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" key="title" content={data.title} />
        <meta name="description" content={data.excerpt} />
        <meta name="keywords" content={data.tags.join(', ')} />
      </Head>
      <div className="max-w-4xl px-3 mx-auto my-8 md:px-8">
        <p className="text-sm font-medium text-coolGray-400">
          <Link href="#">
            <a className="hover:underline">{data.category}</a>
          </Link>
        </p>
        <p className="my-4 text-2xl font-semibold text-gray-50">{data.title}</p>
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap gap-x-1">
            {data.tags.map(tag => (
              <Link key={tag} href={`/blog/tags/${tag}`}>
                <a>
                  <Tag>{tag}</Tag>
                </a>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap mt-2 text-sm text-coolGray-400 space-x-1">
            {date && <time dateTime={date.toLocaleDateString()}>{ago(date)}</time>}
            <span aria-hidden="true">·</span>
            <span>{data.words} words</span>
            <span aria-hidden="true">·</span>
            <span>{data.time}</span>
          </div>
        </div>
      </div>

      <div
        className={`
          max-w-4xl
          md:p-8
          p-3
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
