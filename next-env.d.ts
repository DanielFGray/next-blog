/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="next" />
/// <reference types="next/types/global" />

type ReactNode = React.ReactNode
type ReactChildren = {children: ReactNode}


interface FrontMatter {
  title: string
  excerpt?: string
  category: string
  image?: string
  tags: string[]
  date: string
  updated?: string | null
  words: number
  time: string
  slug: string
}
