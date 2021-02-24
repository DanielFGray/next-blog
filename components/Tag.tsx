import React from 'react'

export default function Tag({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string | undefined
}): JSX.Element {
  return (
    <span
      className={`
         bg-gray-200
         border
         border-gray-200
         font-medium
         hover:border-gray-400
         items-center
         my-1
         pb-0.5
         pt-0
         px-1
         rounded-lg
         text-gray-700
         text-xs
         ${className}
      `}
    >
      {children}
    </span>
  )
}
