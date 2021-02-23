/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="next" />
/// <reference types="next/types/global" />

type ReactNode = React.ReactNode

interface FrontMatter {
  title: string
  excerpt?: string | undefined
  category: string
  image?: string
  tags: string[]
  date: string
  updated?: string | null | undefined
  words: number
  time: string
  slug: string
}
