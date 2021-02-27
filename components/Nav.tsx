import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { NextRouter, useRouter } from 'next/router'

type ActiveLinkProps = LinkProps & {
  children: ReactNode
  activeClassName: string
  router: NextRouter
}

const ActiveLink = ({ children, as, href, router, activeClassName, ...rest }: ActiveLinkProps) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
  const child = React.Children.only(children) as any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const childClassName = child.props.className || ''
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const className =
    (router.asPath === href || router.asPath === as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName) || null
  return (
    <Link {...rest} as={as} href={href}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {React.cloneElement(child, { className })}
    </Link>
  )
}

const Nav = ({ links, children }: { children: ReactNode, links: Array<{ path: string; label: string }> }): JSX.Element => {
  const router = useRouter()
  return (
    <nav className="p-4 text-lg font-medium text-white bg-gray-50 bg-opacity-10">
      <ul className="flex flex-row justify-around">
        {links.map(({ path, label }) => (
          <li key={`${label}${path}`}>
            <ActiveLink href={path} activeClassName="font-extrabold" router={router}>
              <a>{label}</a>
            </ActiveLink>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 right-0 z-10 flex items-center justify-around w-20 h-20 p-2 mb-3 mr-4 bg-black rounded-full bg-opacity-50">
        <div>
          {children}
        </div>
      </div>
    </nav>
  )
}

export default Nav
