import fs from 'fs/promises'
import globby from 'globby'
import grayMatter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import readingTime from 'reading-time'
// import hydrate from 'next-mdx-remote/hydrate'
import path from 'path'
import { descend } from './util'
import type { MdxRemote } from 'next-mdx-remote/types'

// const isServer = typeof window === 'undefined'

const POSTS_PATH = path.join(process.cwd(), 'blog', '/')

export type SourceType = MdxRemote.Source
export type SourceWithMatter = {
  source: SourceType
  data: FrontMatter
}

export function matter(source: string, path: string): { content: string; data: FrontMatter } {
  const { content, data, excerpt } = grayMatter(source, {
    excerpt_separator: '\n\n',
  })
  const date = (data.date as Date)?.toJSON?.() ?? null
  const updated = (data.updated as Date | undefined)?.toJSON?.() ?? null
  const { words, text: time } = readingTime(content)
  return {
    content,
    data: {
      ...data,
      excerpt: excerpt?.trim(),
      date,
      updated,
      slug: path.replace(/\.mdx?$/, ''),
      words,
      time,
    } as FrontMatter,
  }
}

export async function mdxToString({
  source,
  slug,
  components,
}: {
  source: string
  slug: string
  components: MdxRemote.Components
}): Promise<SourceWithMatter> {
  const { data, content } = matter(source, slug)
  const renderedSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [require('mdx-prism'), {
          ignoreMissing: true,
          showLineNumbers: true,
          plugins: ['diff-highlight']
        }],
        require('rehype-slug'),
        require('@jsdevtools/rehype-toc'),
      ],
    },
    scope: (data as Record<keyof FrontMatter, unknown>),
  })
  return { source: renderedSource, data }
}

export async function readMdxFile(slug: string): Promise<string> {
  const postFilePath = path.join(POSTS_PATH, `${slug}.md`)
  return await fs.readFile(postFilePath, 'utf8')
}

export async function getAllFilesFrontMatter(): Promise<FrontMatter[]> {
  const files = await globby(`${POSTS_PATH}**/*.md`, { gitignore: true })
  const allFrontMatter = await Promise.all(
    files.map(async file => {
      const name = file.replace(POSTS_PATH, '').replace(/.mdx?$/, '')
      return matter(await readMdxFile(name), name).data
    }, []),
  )

  return allFrontMatter.sort(descend(x => Number(new Date(x?.updated || x.date))))
}

export async function getStaticBlogPaths(): Promise<{params: {slug: string}}[]> {
  const glob = await globby(`${POSTS_PATH}**/*.md`, { gitignore: true })
  return glob
    .filter(path => /\.mdx?$/.test(path))
    .map(path => ({ params: { slug: path.replace(/\.mdx?$/, '').replace(POSTS_PATH, '') } }))
}
